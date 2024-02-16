<script>
    import logo from '$lib/assets/logo.svg'
    import arrow from '$lib/assets/arrow.svg'

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

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
        <ul>
            <li><a href="/">Translate</a></li>
            <li><a href="/bookmarked">Bookmarked</a></li>
            <li><a href="/recents">Recent Searches</a></li>
            <!-- <li><a href="/about">About</a></li> -->
        </ul>
    </div>
</nav>

<style>
    nav {
        height: 4.25rem;
        background: linear-gradient(180deg, #F1F1F1 50%, rgba(243, 243, 243, 0.00) 100%);
    }

    .back-container {
        position: fixed;
        top: 1rem;
        left: 1rem;
        padding: 0.5rem 0.9rem;
    }

    .logo-container {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 0;
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

    .menu ul {
        list-style: none;
        padding: 20px;
    }

    .menu li {
        margin-bottom: 10px;
    }

    .menu a {
        text-decoration: none;
        color: #333;
        font-size: 18px;
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
</style>
