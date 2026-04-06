(function () {
    const LOGIN_PAGE = "login.html";
    const SIGNUP_PAGE = "signup.html";
    const HOME_PAGE = "index.html";

    function getClient() {
        if (!window.supabaseClient) {
            throw new Error("Supabase client is not initialized.");
        }
        return window.supabaseClient;
    }

    function getCurrentPage() {
        const pathname = window.location.pathname;
        const page = pathname.split("/").pop();
        return page || HOME_PAGE;
    }

    function isAuthPage() {
        const page = getCurrentPage();
        return page === LOGIN_PAGE || page === SIGNUP_PAGE;
    }

    function setPendingState(isPending) {
        document.body.classList.toggle("auth-pending", Boolean(isPending));
    }

    function sanitizeNextPath(nextValue) {
        if (!nextValue) {
            return HOME_PAGE;
        }

        try {
            const url = new URL(nextValue, window.location.href);
            if (url.origin !== window.location.origin) {
                return HOME_PAGE;
            }

            const page = url.pathname.split("/").pop() || HOME_PAGE;
            if (page === LOGIN_PAGE || page === SIGNUP_PAGE) {
                return HOME_PAGE;
            }

            return `${page}${url.search}${url.hash}` || HOME_PAGE;
        } catch (error) {
            console.warn("Invalid next path, falling back to home.", error);
            return HOME_PAGE;
        }
    }

    function getCurrentRelativeUrl() {
        return `${getCurrentPage()}${window.location.search}${window.location.hash}`;
    }

    function getLoginRedirectUrl() {
        return `${LOGIN_PAGE}?next=${encodeURIComponent(getCurrentRelativeUrl())}`;
    }

    function getPostAuthRedirectUrl() {
        const params = new URLSearchParams(window.location.search);
        return sanitizeNextPath(params.get("next"));
    }

    function redirectTo(path) {
        window.location.replace(path);
    }

    function getUserDisplayName(user) {
        const metadataName = user?.user_metadata?.display_name;
        if (typeof metadataName === "string" && metadataName.trim()) {
            return metadataName.trim();
        }

        const fullName = user?.user_metadata?.full_name;
        if (typeof fullName === "string" && fullName.trim()) {
            return fullName.trim();
        }

        const email = user?.email || "";
        if (email.includes("@")) {
            return email.split("@")[0];
        }

        return "Student";
    }

    function getUserInitial(user) {
        const displayName = getUserDisplayName(user).trim();
        const [firstChar = "S"] = Array.from(displayName);
        return firstChar.toUpperCase();
    }

    function setFormMessage(type, message) {
        const messageBox = document.querySelector("[data-auth-message]");
        if (!messageBox) {
            return;
        }

        messageBox.hidden = !message;
        messageBox.textContent = message || "";
        messageBox.dataset.type = type || "info";
    }

    function setSubmitBusy(form, isBusy, label) {
        const submitButton = form?.querySelector('button[type="submit"]');
        if (!submitButton) {
            return;
        }

        submitButton.disabled = Boolean(isBusy);
        if (label) {
            submitButton.dataset.originalLabel = submitButton.dataset.originalLabel || submitButton.textContent;
            submitButton.textContent = label;
        } else if (submitButton.dataset.originalLabel) {
            submitButton.textContent = submitButton.dataset.originalLabel;
        }
    }

    function positionDropdown() {
        const userMenu = document.getElementById("auth-user-menu");
        const avatarButton = document.getElementById("auth-avatar-btn");
        const dropdown = document.getElementById("auth-dropdown");

        if (!userMenu || !avatarButton || !dropdown || userMenu.hidden || dropdown.hidden) {
            return;
        }

        const viewportGap = 14;
        const verticalOffset = 12;
        const avatarRect = avatarButton.getBoundingClientRect();
        const dropdownWidth = dropdown.offsetWidth || 260;
        const maxLeft = window.innerWidth - dropdownWidth - viewportGap;
        const nextLeft = Math.min(Math.max(avatarRect.right - dropdownWidth, viewportGap), Math.max(viewportGap, maxLeft));
        const nextTop = avatarRect.bottom + verticalOffset;

        dropdown.style.left = `${nextLeft}px`;
        dropdown.style.top = `${Math.max(viewportGap, nextTop)}px`;
    }

    function setMenuOpen(isOpen) {
        const userMenu = document.getElementById("auth-user-menu");
        const avatarButton = document.getElementById("auth-avatar-btn");
        const dropdown = document.getElementById("auth-dropdown");

        if (!userMenu || !avatarButton || !dropdown) {
            return;
        }

        const nextState = Boolean(isOpen) && !userMenu.hidden && !avatarButton.hidden;
        userMenu.classList.toggle("is-open", nextState);
        dropdown.hidden = !nextState;
        avatarButton.setAttribute("aria-expanded", String(nextState));

        if (nextState) {
            requestAnimationFrame(positionDropdown);
            return;
        }

        dropdown.style.removeProperty("top");
        dropdown.style.removeProperty("left");
    }

    function updateProtectedUi(session) {
        const user = session?.user || null;
        const displayName = getUserDisplayName(user);
        const email = user?.email || "";
        const userMenu = document.getElementById("auth-user-menu");
        const avatarButton = document.getElementById("auth-avatar-btn");
        const avatarInitial = document.getElementById("auth-avatar-initial");
        const menuName = document.getElementById("auth-menu-name");
        const menuEmail = document.getElementById("auth-menu-email");
        const logoutButton = document.getElementById("logout-btn");

        if (avatarInitial) {
            avatarInitial.textContent = getUserInitial(user);
        }

        if (menuName) {
            menuName.textContent = displayName;
        }

        if (menuEmail) {
            menuEmail.textContent = email;
            menuEmail.hidden = !email;
        }

        if (userMenu) {
            userMenu.hidden = false;
        }

        if (avatarButton) {
            avatarButton.hidden = false;
            avatarButton.disabled = false;
            avatarButton.setAttribute("aria-label", `Open account menu for ${displayName}`);
        }

        if (logoutButton) {
            logoutButton.disabled = false;
        }
    }

    function clearProtectedUi() {
        const userMenu = document.getElementById("auth-user-menu");
        const avatarButton = document.getElementById("auth-avatar-btn");
        const avatarInitial = document.getElementById("auth-avatar-initial");
        const menuName = document.getElementById("auth-menu-name");
        const menuEmail = document.getElementById("auth-menu-email");
        const logoutButton = document.getElementById("logout-btn");

        setMenuOpen(false);

        if (avatarInitial) {
            avatarInitial.textContent = "B";
        }

        if (menuName) {
            menuName.textContent = "";
        }

        if (menuEmail) {
            menuEmail.textContent = "";
            menuEmail.hidden = true;
        }

        if (userMenu) {
            userMenu.hidden = true;
        }

        if (avatarButton) {
            avatarButton.hidden = true;
            avatarButton.disabled = false;
            avatarButton.removeAttribute("aria-label");
        }

        if (logoutButton) {
            logoutButton.disabled = false;
        }
    }

    async function getSession() {
        const { data, error } = await getClient().auth.getSession();
        if (error) {
            throw error;
        }

        return data.session;
    }

    function handleMenuPlaceholder(label) {
        setMenuOpen(false);
        alert(`${label} will be available soon.`);
    }

    function initUserMenu() {
        const userMenu = document.getElementById("auth-user-menu");
        const avatarButton = document.getElementById("auth-avatar-btn");
        const profileButton = document.getElementById("auth-profile-btn");
        const settingsButton = document.getElementById("auth-settings-btn");

        if (!userMenu || !avatarButton) {
            return;
        }

        if (avatarButton.dataset.bound !== "true") {
            avatarButton.dataset.bound = "true";
            avatarButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const willOpen = avatarButton.getAttribute("aria-expanded") !== "true";
                setMenuOpen(willOpen);
            });
        }

        if (profileButton && profileButton.dataset.bound !== "true") {
            profileButton.dataset.bound = "true";
            profileButton.addEventListener("click", () => {
                handleMenuPlaceholder("Profile");
            });
        }

        if (settingsButton && settingsButton.dataset.bound !== "true") {
            settingsButton.dataset.bound = "true";
            settingsButton.addEventListener("click", () => {
                handleMenuPlaceholder("Settings");
            });
        }

        if (!window.__bachubMenuListenersBound) {
            window.__bachubMenuListenersBound = true;

            document.addEventListener("click", (event) => {
                const currentMenu = document.getElementById("auth-user-menu");
                if (!currentMenu || currentMenu.hidden) {
                    return;
                }

                if (!currentMenu.contains(event.target)) {
                    setMenuOpen(false);
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setMenuOpen(false);
                }
            });

            window.addEventListener("resize", () => {
                const dropdown = document.getElementById("auth-dropdown");
                if (dropdown && !dropdown.hidden) {
                    positionDropdown();
                }
            });

            window.addEventListener("scroll", () => {
                const dropdown = document.getElementById("auth-dropdown");
                if (dropdown && !dropdown.hidden) {
                    positionDropdown();
                }
            }, true);
        }
    }

    function initLogout() {
        const logoutButton = document.getElementById("logout-btn");
        if (!logoutButton || logoutButton.dataset.bound === "true") {
            return;
        }

        logoutButton.dataset.bound = "true";
        logoutButton.addEventListener("click", async () => {
            logoutButton.disabled = true;
            setMenuOpen(false);

            try {
                const { error } = await getClient().auth.signOut();
                if (error) {
                    throw error;
                }
                redirectTo(LOGIN_PAGE);
            } catch (error) {
                console.error("Logout failed", error);
                alert(error.message || "Unable to log out right now.");
                logoutButton.disabled = false;
            }
        });
    }

    function initAuthSubscription() {
        if (window.__bachubAuthSubscribed) {
            return;
        }

        window.__bachubAuthSubscribed = true;
        getClient().auth.onAuthStateChange((event, session) => {
            if (session) {
                updateProtectedUi(session);
                return;
            }

            clearProtectedUi();
            if (!isAuthPage() && event === "SIGNED_OUT") {
                redirectTo(getLoginRedirectUrl());
            }
        });
    }

    async function requireAuth() {
        setPendingState(true);
        initUserMenu();
        initLogout();
        initAuthSubscription();
        let shouldReveal = false;

        try {
            const session = await getSession();
            if (!session) {
                clearProtectedUi();
                redirectTo(getLoginRedirectUrl());
                return null;
            }

            updateProtectedUi(session);
            shouldReveal = true;
            return session;
        } catch (error) {
            console.error("Session check failed", error);
            clearProtectedUi();
            redirectTo(LOGIN_PAGE);
            return null;
        } finally {
            if (shouldReveal) {
                setPendingState(false);
            }
        }
    }

    async function redirectAuthenticatedUser() {
        setPendingState(true);
        let shouldReveal = true;

        try {
            const session = await getSession();
            if (session) {
                shouldReveal = false;
                redirectTo(getPostAuthRedirectUrl());
                return session;
            }

            return null;
        } catch (error) {
            console.error("Unable to read auth session", error);
            return null;
        } finally {
            if (shouldReveal) {
                setPendingState(false);
            }
        }
    }

    async function handleLogin(form) {
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            setFormMessage("error", "Enter both email and password.");
            return;
        }

        setSubmitBusy(form, true, "Signing in...");
        setFormMessage("info", "");

        try {
            const { data, error } = await getClient().auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw error;
            }

            updateProtectedUi(data.session);
            redirectTo(getPostAuthRedirectUrl());
        } catch (error) {
            console.error("Login failed", error);
            setFormMessage("error", error.message || "Unable to sign in.");
        } finally {
            setSubmitBusy(form, false);
        }
    }

    async function handleSignup(form) {
        const displayName = form.displayName.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!displayName || !email || !password) {
            setFormMessage("error", "Enter your display name, email, and password.");
            return;
        }

        if (password.length < 6) {
            setFormMessage("error", "Password must be at least 6 characters.");
            return;
        }

        setSubmitBusy(form, true, "Creating account...");
        setFormMessage("info", "");

        try {
            const { data, error } = await getClient().auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: new URL(HOME_PAGE, window.location.href).href,
                    data: {
                        display_name: displayName
                    }
                }
            });

            if (error) {
                throw error;
            }

            if (data.session) {
                updateProtectedUi(data.session);
                redirectTo(getPostAuthRedirectUrl());
                return;
            }

            setFormMessage("success", `Account created for ${displayName}. Check your email to confirm your signup, then log in.`);
            form.reset();
        } catch (error) {
            console.error("Signup failed", error);
            setFormMessage("error", error.message || "Unable to create account.");
        } finally {
            setSubmitBusy(form, false);
        }
    }

    async function initAuthPage(mode) {
        initAuthSubscription();
        const session = await redirectAuthenticatedUser();
        if (session) {
            return;
        }

        const form = document.querySelector("[data-auth-form]");
        if (!form) {
            return;
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (mode === "signup") {
                await handleSignup(form);
                return;
            }

            await handleLogin(form);
        });
    }

    window.BacHubAuth = {
        requireAuth,
        initAuthPage
    };
})();
