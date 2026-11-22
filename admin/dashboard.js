
/* ==========================================
   DTSC ALUMNI ASSOCIATION
   ADMIN DASHBOARD AUTHENTICATION
========================================== */

document.addEventListener("DOMContentLoaded", async function () {

    // HTML Elements
    const adminName = document.getElementById("adminName");
    const adminRole = document.getElementById("adminRole");
    const adminAvatar = document.getElementById("adminAvatar");
    const welcomeName = document.getElementById("welcomeName");

    const authStatus = document.getElementById("authStatus");
    const roleStatus = document.getElementById("roleStatus");
    const databaseStatus = document.getElementById("databaseStatus");

    const logoutBtn = document.getElementById("logoutBtn");

    // Check Supabase connection
    if (typeof supabaseClient === "undefined") {
        alert("Database configuration not found.");
        window.location.replace("./index.html");
        return;
    }

    // Check login session
    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError || !sessionData.session) {
        window.location.replace("./index.html");
        return;
    }

    const user = sessionData.session.user;

    // Verify admin permission
    const { data: admin, error: adminError } =
        await supabaseClient
            .from("admin_users")
            .select("user_id, role")
            .eq("user_id", user.id)
            .maybeSingle();

    if (
        adminError ||
        !admin ||
        !["admin", "super_admin"].includes(admin.role)
    ) {
        await supabaseClient.auth.signOut();
        window.location.replace("./index.html");
        return;
    }

    // Display admin information
    const email = user.email || "Administrator";
    const displayName = email.split("@")[0];

    if (adminName) adminName.textContent = displayName;
    if (welcomeName) welcomeName.textContent = displayName;

    if (adminRole) {
        adminRole.textContent =
            admin.role === "super_admin"
                ? "SUPER ADMIN"
                : "ADMINISTRATOR";
    }

    if (adminAvatar) {
        adminAvatar.textContent =
            displayName.charAt(0).toUpperCase();
    }

    // Update system status
    if (authStatus) {
        authStatus.textContent = "Authenticated";
    }

    if (roleStatus) {
        roleStatus.textContent =
            admin.role === "super_admin"
                ? "Super Admin Verified"
                : "Admin Verified";
    }

    if (databaseStatus) {
        databaseStatus.textContent = "Connected";
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function () {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) return;

            logoutBtn.disabled = true;
            logoutBtn.textContent = "Logging out...";

            const { error } =
                await supabaseClient.auth.signOut();

            if (error) {
                alert("Logout failed. Please try again.");
                logoutBtn.disabled = false;
                logoutBtn.textContent = "Logout";
                return;
            }

            window.location.replace("./index.html");
        });
    }

    console.log("DTSC Admin Dashboard initialized.");
});
