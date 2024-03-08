<div class="container">
    <div class="skeleton-container">
        <div class="skeleton-header-container">
            <div class="skeleton skeleton-text pulsate"></div>
            <div class="skeleton skeleton-header pulsate"></div>
        </div>
        <div class="skeleton skeleton-box pulsate"></div>
        <div class="skeleton skeleton-text pulsate"></div>
        <div class="skeleton skeleton-box pulsate"></div>
        <div class="skeleton skeleton-box pulsate"></div>
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

    /* .skeleton {
        opacity: .7;
        animation: skeleton-loading 1s linear infinite alternate-reverse;
    } */

    .skeleton-text {
        width: 50%;
        height: .5rem;
        margin-bottom: .5rem;
        border-radius: .5rem;
    }

    .skeleton-header {
        width: 75%;
        height: 3rem;
        margin-top: .5rem;
        border-radius: .5rem;
    }

    .skeleton-box {
        width: 100%;
        height: 10.5rem;
        margin-bottom: 1.5rem;
        border-radius: 1rem;
    }

    .skeleton-text:last-child {
        margin-bottom: 0;
        width: 80%;
    }

    .pulsate {
        opacity: 0.9;
        background: linear-gradient(-45deg, #DDDDDD, #F0F0F0, #DDDDDD, #F0F0F0);
        background-size: 400% 400%;
        animation: Gradient 2.25s ease-in-out infinite;
    }


    @keyframes Gradient {
	0% {
		background-position: 0% 50%
	}
	50% {
		background-position: 100% 50%
	}
	100% {
		background-position: 0% 50%
	}
}

    /* gradient   
        background: linear-gradient(white, white) padding-box, linear-gradient(135deg,#006DCA, #DD2235, #FF8200, #FFC50E, #006F3A) border-box;
    */
</style>