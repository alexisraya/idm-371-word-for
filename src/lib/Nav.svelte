<script>
    import logo from '$lib/assets/logo.svg'
    import arrow from '$lib/assets/arrow.svg'

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<div class="shadow" class:active={isOpen}></div>

<div class="nav-bg"></div>

<nav>
        <div class="back-container">
            <!-- NEED FUNCTIONALITY -->
            <img src="{arrow}" alt="back-arrow">
        </div>

        <div class="logo-container">
            <!-- Does this link to home page? -->
            <img src="{logo}" alt="word-for-logo">
        </div>

        <div class="hamburger" on:click={toggleMenu} class:active={isOpen}>
            <span />
            <span />
            <span />
        </div>

        <div class="menu" class:active={isOpen}>
            <img src="{logo}" alt="word-for-logo">

            <ul>
                <hr>
                <li><a href="/">Translate</a></li>
                <hr>
                <li><a href="/bookmarked">Bookmarks</a></li>
                <hr>
                <li><a href="/recents">Recent Searches</a></li>
                <hr>
                <!-- <li><a href="/about">About</a></li> -->
            </ul>
        </div>
</nav>

<style>
    nav {
    }

    .nav-bg {
        height: 4.25rem;
        background: linear-gradient(180deg, #FFFFFF 70%, rgba(243, 243, 243, 0.00) 100%);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .back-container {
        position: fixed;
        top: 1rem;
        left: 1rem;
        padding: 0.5rem 0.9rem;
        z-index: 1;
    }

    .logo-container {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 0;
        z-index: 1;
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
        padding: 0.68rem;
        z-index: 10;
        cursor: pointer;
    }

    .hamburger span {
        display: block;
        width: 1.7rem;
        height: 1.5px;
        background-color: var(--primary-black);
        margin-bottom: 8.25px;
        border-radius: 1px;
        transition: transform 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
        transform: translateY(11px) rotate(45deg);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
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
