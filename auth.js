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

    function updateProtectedUi(session) {
        const email = session?.user?.email || "Signed in";
        const userChip = document.getElementById("auth-user-chip");
        const userEmail = document.getElementById("auth-user-email");
        const logoutButton = document.getElementById("logout-btn");

        if (userEmail) {
            userEmail.textContent = email;
        }

        if (userChip) {
            userChip.hidden = false;
        }

        if (logoutButton) {
            logoutButton.hidden = false;
            logoutButton.disabled = false;
        }
    }

    function clearProtectedUi() {
        const userChip = document.getElementById("auth-user-chip");
        const userEmail = document.getElementById("auth-user-email");
        const logoutButton = document.getElementById("logout-btn");

        if (userEmail) {
            userEmail.textContent = "";
        }

        if (userChip) {
            userChip.hidden = true;
        }

        if (logoutButton) {
            logoutButton.hidden = true;
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

    function initLogout() {
        const logoutButton = document.getElementById("logout-btn");
        if (!logoutButton || logoutButton.dataset.bound === "true") {
            return;
        }

        logoutButton.dataset.bound = "true";
        logoutButton.addEventListener("click", async () => {
            logoutButton.disabled = true;

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
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            setFormMessage("error", "Enter both email and password.");
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
                    emailRedirectTo: new URL(HOME_PAGE, window.location.href).href
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

            setFormMessage("success", "Account created. Check your email to confirm your signup, then log in.");
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
