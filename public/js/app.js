let auth0Client = null;
let scripts = document.getElementsByTagName("script")
let src = scripts[scripts.length - 1].src;
let url = src.slice(0, -9)

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });
};

window.onload = async () => {
  console.log(url)
  await configureClient();

  updateUI();

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {

    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0Client.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

  console.log(isAuthenticated)
  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0Client.getTokenSilently();

    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0Client.getUser()
    );

    document.getElementById("btn-logout").classList.remove("hidden");
    document.getElementById("btn-login").classList.add("hidden");
    document.getElementById("menuitem").classList.remove("hidden");
    document.getElementById("gated-content").classList.remove("hidden");


  } else if (!isAuthenticated){
    document.getElementById("btn-logout").classList.add("hidden");
    document.getElementById("btn-login").classList.remove("hidden");
    document.getElementById("menuitem").classList.add("hidden");
  }
};


const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: url + 'home.html'
    }
  });
};

const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: url
    }
  });
};

