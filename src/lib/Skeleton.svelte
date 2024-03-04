<div class="container">
    <div class="skeleton-container">
        <div class="skeleton-header-container">
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-header"></div>
        </div>
        <div class="skeleton skeleton-box"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-box"></div>
        <div class="skeleton skeleton-box"></div>
    </div>
</div>

<style>
    .container{
        display: flex;
        justify-content: center;
    }
    .skeleton-container{
        width: 365px;
    }
    .skeleton-header-container{
        margin: 1.5rem 0;
    }

    .skeleton {
        opacity: .7;
        animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
        width: 50%;
        height: .5rem;
        margin-bottom: .25rem;
        border-radius: .125rem;
    }

    .skeleton-header {
        width: 75%;
        height: 3rem;
        margin-top: .5rem;
        border-radius: .125rem;
    }

    .skeleton-box {
        width: 100%;
        height: 10.5rem;
        margin-bottom: 1.5rem;
        border-radius: .125rem;
    }

    .skeleton-text:last-child {
        margin-bottom: 0;
        width: 80%;
    }

    @keyframes skeleton-loading {
    0% {
        background-color: hsl(200, 20%, 70%);
    }

    100% {
        background-color: hsl(200, 20%, 95%);
    }
    }
</style>