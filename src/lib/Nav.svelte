<script>
  import logo from "$lib/assets/logo.svg";
  import { previousPage } from "../stores/pageStore";
  import { goto } from "$app/navigation";
  import RemixIcon from "./RemixIcon.svelte";

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function goHome() {
    goto("/");
  }

  function goBack() {
    const prevPage = $previousPage;
    if (prevPage == "bookmarked") {
      goto("/bookmarked");
    } else if (prevPage == "translationResults") {
      goto("/translation-results");
    } else if (prevPage == "result") {
      goto("/result");
    } else if (prevPage == "recents") {
      goto("/recents");
    } else {
      goto("/");
    }
  }

  function handleNavClick() {
    isOpen = false;
  }
</script>

<div class="shadow" class:active={isOpen} />

<div class="nav-bg" />

<nav>
  <div class="back-container">
    <!-- NEED FUNCTIONALITY -->
    <button on:click={goBack}>
      <RemixIcon name="arrow-left-s-line" size="42px" />
    </button>
  </div>

  <div class="logo-container">
    <!-- Does this link to home page? -->
    <button on:click={goHome}>
      <img src={logo} alt="word-for-logo" />
    </button>
  </div>

  <div
    class="hamburger"
    on:click={toggleMenu}
    on:keydown={toggleMenu}
    role="button"
    tabindex="0"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <div class="icon-container">
      {#if !isOpen}
        <RemixIcon name="menu-line" size="32px" />
      {:else}
        <RemixIcon name="close-line" size="32px" />
      {/if}
    </div>
  </div>

  <div class="menu" class:active={isOpen}>
    <img src={logo} alt="word-for-logo" />

    <ul>
      <hr />
      <li><a href="/" on:click={handleNavClick}>Translate</a></li>
      <hr />
      <li><a href="/bookmarked" on:click={handleNavClick}>Bookmarks</a></li>
      <hr />
      <li><a href="/recents" on:click={handleNavClick}>Recent Searches</a></li>
      <hr />
      <!-- <li><a href="/about">About</a></li> -->
    </ul>
  </div>
</nav>

<style>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .nav-bg {
    height: 4.25rem;
    background: linear-gradient(
      180deg,
      #ffffff 70%,
      rgba(243, 243, 243, 0) 100%
    );
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .back-container {
    position: fixed;
    top: 1rem;
    left: 1rem;
    padding: 0.75rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    box-sizing: border-box;
  }

  .logo-container {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    box-sizing: border-box;
  }

  .menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 17.625rem;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 9;
  }

  .menu.active {
    transform: translateX(0%);
  }

  .menu img {
    padding: 1.5rem 2rem 0;
  }

  .menu hr {
    background-color: var(--cloud-grey);
    border-top: 0.0625rem var(--cloud-grey);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    margin: 0;
    padding: 0.75rem 1.5rem;
    margin-bottom: 10px;
  }

  .menu a {
    text-decoration: none;
    font-size: 18px;
    color: var(--text-black);
    font-family: "Fira Sans";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
  }

  .hamburger {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 0.75rem;
    z-index: 10;
    cursor: pointer;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    box-sizing: border-box;
  }

  .icon-container {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shadow {
    position: fixed;
    background-color: black;
    opacity: 0;
    width: 0;
    height: 0;
    z-index: 2;
    transition: 0.2s opacity;
  }

  .shadow.active {
    width: 100vw;
    height: 100vh;
    opacity: 0.75;
  }
</style>
