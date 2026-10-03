document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       PAGE FADE IN
    ================================= */

    document.body.classList.add("page-loaded");


    /* =========================================
   SURPRISE GIFT
========================================= */

const giftBox =
    document.getElementById("giftBox");

const surpriseModal =
    document.getElementById("surpriseModal");

const closeSurprise =
    document.getElementById("closeSurprise");

const celebrateButton =
    document.getElementById("celebrateButton");

const giftHint =
    document.getElementById("giftHint");


if (giftBox && surpriseModal) {

    giftBox.addEventListener("click", () => {

        giftBox.classList.add("opened");

        if (giftHint) {
            giftHint.textContent =
                "Your surprise is opening... ✨";
        }

        setTimeout(() => {

            surpriseModal.classList.add("active");

            if (giftHint) {
                giftHint.textContent =
                    "✦ Your surprise is here ✦";
            }

            launchConfetti();

        }, 700);

    });


    const closeGift = () => {

        surpriseModal.classList.remove(
            "active"
        );

        setTimeout(() => {

            giftBox.classList.remove(
                "opened"
            );

        }, 300);

    };


    if (closeSurprise) {

        closeSurprise.addEventListener(
            "click",
            closeGift
        );

    }


    const backdrop =
        surpriseModal.querySelector(
            ".surprise-backdrop"
        );

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeGift
        );

    }


    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            () => {

                launchConfetti();

                setTimeout(() => {
                    launchConfetti();
                }, 600);

            }
        );

    }

}
/* =========================================
   MAKE A WISH + CANDLES
========================================= */

const candles =
    document.querySelectorAll(".candle");

const wishButton =
    document.getElementById("wishButton");

const candleHint =
    document.getElementById("candleHint");

const fireworksModal =
    document.getElementById("fireworksModal");

const closeFireworks =
    document.getElementById("closeFireworks");

const fireworksCanvas =
    document.getElementById("fireworksCanvas");


let blownCandles = 0;


/* =========================================
   BLOW CANDLES
========================================= */

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (candle.classList.contains("blown")) {
            return;
        }

        candle.classList.add("blown");

        blownCandles++;

        /* Small celebration */

        launchConfetti();


        if (blownCandles === candles.length) {

            if (candleHint) {

                candleHint.textContent =
                    "✨ Perfect! Now make your wish... ✨";

            }

            if (wishButton) {

                wishButton.classList.add("ready");

            }

        } else {

            if (candleHint) {

                candleHint.textContent =
                    `${candles.length - blownCandles} candles left... 🕯️`;

            }

        }

    });

});


/* =========================================
   MAKE MY WISH
========================================= */

if (wishButton) {

    wishButton.addEventListener(
        "click",
        () => {

            if (
                blownCandles !== candles.length
            ) {
                return;
            }

            openFireworks();

        }
    );

}


/* =========================================
   FIREWORKS
========================================= */

function openFireworks() {

    if (!fireworksModal) {
        return;
    }

    fireworksModal.classList.add("active");

    startFireworks();

    launchConfetti();

    setTimeout(() => {
        launchConfetti();
    }, 700);

    setTimeout(() => {
        launchConfetti();
    }, 1400);

}


/* =========================================
   CLOSE FIREWORKS
========================================= */

if (closeFireworks) {

    closeFireworks.addEventListener(
        "click",
        () => {

            fireworksModal.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================
   FIREWORKS ENGINE
========================================= */

function startFireworks() {

    if (!fireworksCanvas) {
        return;
    }

    const canvas =
        fireworksCanvas;

    const ctx =
        canvas.getContext("2d");

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    let fireworks = [];

    let particles = [];


    function random(min, max) {

        return Math.random() *
            (max - min) +
            min;

    }


    function createFirework() {

        const x =
            random(
                canvas.width * .15,
                canvas.width * .85
            );

        const y =
            random(
                canvas.height * .15,
                canvas.height * .55
            );


        const color =
            `hsl(${random(0,360)},100%,65%)`;


        for (let i = 0; i < 55; i++) {

            const angle =
                (Math.PI * 2 / 55) * i;

            const speed =
                random(2, 6);


            particles.push({

                x,
                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 1,

                decay:
                    random(.012,.025),

                color

            });

        }

    }


    function draw() {

        ctx.fillStyle =
            "rgba(5,5,13,.18)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* Random fireworks */

        if (Math.random() < .045) {

            createFirework();

        }


        particles.forEach(
            (particle, index) => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy += .025;

                particle.life -=
                    particle.decay;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    2,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    particle.color;

                ctx.globalAlpha =
                    particle.life;

                ctx.fill();


                if (
                    particle.life <= 0
                ) {

                    particles.splice(
                        index,
                        1
                    );

                }

            }
        );


        ctx.globalAlpha = 1;

        requestAnimationFrame(draw);

    }


    draw();


    /* Initial fireworks */

    setTimeout(createFirework, 200);
    setTimeout(createFirework, 700);
    setTimeout(createFirework, 1200);
    setTimeout(createFirework, 1800);

}


/* =========================================
   ESC CLOSE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            fireworksModal
        ) {

            fireworksModal.classList.remove(
                "active"
            );

        }

    }
);

/* ESC closes surprise */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (
                surpriseModal &&
                surpriseModal.classList.contains(
                    "active"
                )
            ) {

                surpriseModal.classList.remove(
                    "active"
                );

                giftBox.classList.remove(
                    "opened"
                );

            }

        }

    }
);
    /* ================================
       MUSIC
    ================================= */

    const musicButton = document.getElementById("musicButton");
    const birthdayMusic = document.getElementById("birthdayMusic");
    const musicTitle = document.getElementById("musicTitle");
    const musicText = document.getElementById("musicText");

    let musicPlaying = false;

    if (musicButton && birthdayMusic) {

        musicButton.addEventListener("click", async () => {

            try {

                if (!musicPlaying) {

                    await birthdayMusic.play();

                    musicPlaying = true;

                    if (musicTitle) {
                        musicTitle.textContent = "Birthday Music";
                    }

                    if (musicText) {
                        musicText.textContent = "Celebration is on ✨";
                    }

                    const arrow = musicButton.querySelector(".action-arrow");

                    if (arrow) {
                        arrow.textContent = "❚❚";
                    }

                    musicButton.classList.add("music-playing");

                    launchConfetti();

                } else {

                    birthdayMusic.pause();

                    musicPlaying = false;

                    if (musicTitle) {
                        musicTitle.textContent = "Birthday Vibes";
                    }

                    if (musicText) {
                        musicText.textContent = "Turn on the celebration";
                    }

                    const arrow = musicButton.querySelector(".action-arrow");

                    if (arrow) {
                        arrow.textContent = "▶";
                    }

                    musicButton.classList.remove("music-playing");
                }

            } catch (error) {

                console.log("Music could not be played.");

                if (musicText) {
                    musicText.textContent =
                        "Add birthday.mp3 to play music";
                }

            }

        });
    }


    /* ================================
       CONFETTI
    ================================= */

    function launchConfetti() {

        const confettiContainer = document.createElement("div");

        confettiContainer.className = "confetti-container";

        document.body.appendChild(confettiContainer);

        const symbols = [
            "✦",
            "✧",
            "♥",
            "♡",
            "★",
            "✨",
            "🎉",
            "🎈"
        ];

        for (let i = 0; i < 70; i++) {

            const confetti = document.createElement("span");

            confetti.className = "confetti";

            confetti.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            confetti.style.left =
                Math.random() * 100 + "%";

            confetti.style.animationDelay =
                Math.random() * 1.5 + "s";

            confetti.style.animationDuration =
                2.5 + Math.random() * 3 + "s";

            confetti.style.fontSize =
                10 + Math.random() * 16 + "px";

            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {

            confettiContainer.remove();

        }, 6000);
    }


    /* ================================
       SPARKLE PARTICLES
    ================================= */

    function createSparkles() {

        const sparkleContainer =
            document.createElement("div");

        sparkleContainer.className =
            "sparkle-container";

        document.body.appendChild(sparkleContainer);

        for (let i = 0; i < 25; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className =
                "particle-sparkle";

            sparkle.textContent =
                Math.random() > 0.5 ? "✦" : "✧";

            sparkle.style.left =
                Math.random() * 100 + "%";

            sparkle.style.top =
                Math.random() * 100 + "%";

            sparkle.style.animationDelay =
                Math.random() * 5 + "s";

            sparkle.style.animationDuration =
                3 + Math.random() * 4 + "s";

            sparkleContainer.appendChild(sparkle);
        }
    }

    createSparkles();


    /* ================================
       CARD HOVER EFFECT
    ================================= */

    const cards =
        document.querySelectorAll(
            ".action-card, .wish-card, .memory-card"
        );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.setProperty(
                "--mouse-x",
                "50%"
            );

            card.style.setProperty(
                "--mouse-y",
                "50%"
            );

        });

    });


    /* ================================
       RIPPLE EFFECT
    ================================= */

    const clickableElements =
        document.querySelectorAll(
            ".action-card, .primary-button, .secondary-button, .home-btn"
        );

    clickableElements.forEach(element => {

        element.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.className = "click-ripple";

            const rect =
                this.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            ripple.style.left = x + "px";
            ripple.style.top = y + "px";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 700);

        });

    });


    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealElements =
        document.querySelectorAll(
            ".wish-card, " +
            ".memory-card, " +
            ".letter-card, " +
            ".quote-box, " +
            ".timeline-item, " +
            ".featured-memory, " +
            ".memories-final, " +
            ".heart-section"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show-reveal"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "show-reveal"
            );

        });

    }


    /* ================================
       WISH CARD CLICK
    ================================= */

    const wishCards =
        document.querySelectorAll(".wish-card");

    wishCards.forEach(card => {

        card.addEventListener("click", () => {

            card.classList.add("wish-selected");

            setTimeout(() => {

                card.classList.remove(
                    "wish-selected"
                );

            }, 700);

        });

    });


    /* ================================
       MEMORY IMAGE CLICK
    ================================= */

    const memoryImages =
        document.querySelectorAll(
            ".memory-image img, .featured-image img"
        );

    memoryImages.forEach(image => {

        image.addEventListener("click", () => {

            const lightbox =
                document.createElement("div");

            lightbox.className =
                "image-lightbox";

            const fullImage =
                document.createElement("img");

            fullImage.src = image.src;

            fullImage.alt =
                image.alt || "Memory";

            const closeButton =
                document.createElement("button");

            closeButton.className =
                "lightbox-close";

            closeButton.textContent = "×";

            lightbox.appendChild(fullImage);
            lightbox.appendChild(closeButton);

            document.body.appendChild(lightbox);

            setTimeout(() => {

                lightbox.classList.add(
                    "lightbox-visible"
                );

            }, 10);

            const closeLightbox = () => {

                lightbox.classList.remove(
                    "lightbox-visible"
                );

                setTimeout(() => {
                    lightbox.remove();
                }, 300);

            };

            closeButton.addEventListener(
                "click",
                closeLightbox
            );

            lightbox.addEventListener(
                "click",
                event => {

                    if (event.target === lightbox) {
                        closeLightbox();
                    }

                }
            );

        });

    });


    /* ================================
       ESCAPE TO CLOSE IMAGE
    ================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                const lightbox =
                    document.querySelector(
                        ".image-lightbox"
                    );

                if (lightbox) {
                    lightbox.remove();
                }

            }

        }
    );


    /* ================================
       SMALL CELEBRATION ON HOME
    ================================= */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        setTimeout(() => {

            hero.classList.add(
                "hero-ready"
            );

        }, 300);

    }


    /* ================================
       RANDOM FLOATING HEART
    ================================= */

    function createFloatingHeart() {

        const heart =
            document.createElement("div");

        heart.className =
            "random-heart";

        heart.textContent =
            Math.random() > 0.5
                ? "♡"
                : "♥";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDuration =
            5 + Math.random() * 5 + "s";

        heart.style.fontSize =
            12 + Math.random() * 18 + "px";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 10000);
    }


    setInterval(
        createFloatingHeart,
        2500
    );


    /* ================================
       DOUBLE CLICK CELEBRATION
    ================================= */

    document.addEventListener(
        "dblclick",
        event => {

            if (
                event.target.closest(
                    "a, button"
                )
            ) {
                return;
            }

            launchConfetti();

        }
    );

});

/* =========================================
   Don SECRET MESSAGE
========================================= */

const unlockButton =
    document.getElementById("unlockButton");

const secretBox =
    document.querySelector(
        ".secret-message-box"
    );

const lockIcon =
    document.getElementById("lockIcon");

const secretTitle =
    document.getElementById("secretTitle");

const secretText =
    document.getElementById("secretText");


if (
    unlockButton &&
    secretBox
) {

    unlockButton.addEventListener(
        "click",
        () => {

            secretBox.classList.add(
                "unlocked"
            );


            /* Change lock */

            if (lockIcon) {

                lockIcon.textContent =
                    "💖";

            }


            /* Change title */

            if (secretTitle) {

                secretTitle.textContent =
                    "For, DON JI 👑";

            }


            /* Secret message */

            if (secretText) {

                secretText.innerHTML = `
                     you are genuinely
                    one of those people who make
                    ordinary moments feel special. 💖
                    <br><br>

                    May your smile always stay this
                    beautiful, your dreams keep getting
                    bigger, and your life be filled with
                    moments worth remembering. ✨
                    <br><br>

                    Keep shining, Bby 🫶🏻🫰🏻 💖
                `;

            }


            /* Button */

            unlockButton.textContent =
                "💖 Message Unlocked";


            unlockButton.disabled =
                true;


            /* Celebration */

            launchConfetti();


            setTimeout(() => {

                launchConfetti();

            }, 500);


            /* Sparkles */

            if (
                typeof createSparkles ===
                "function"
            ) {

                createSparkles();

            }

        }
    );

}
/* =========================================
   GRAND BIRTHDAY OPENING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const birthdayIntro =
        document.getElementById("birthdayIntro");

    const enterBirthday =
        document.getElementById("enterBirthday");

    if (!birthdayIntro) return;


    /* =====================================
       CREATE INTRO CONFETTI
    ===================================== */

    const confettiContainer =
        birthdayIntro.querySelector(".intro-confetti");

    function createIntroConfetti() {

        if (!confettiContainer) return;

        const symbols = [
            "✦",
            "✧",
            "•",
            "♥",
            "✨",
            "◆"
        ];

        for (let i = 0; i < 45; i++) {

            const piece =
                document.createElement("span");

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            piece.style.position = "absolute";

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.top =
                Math.random() * 100 + "%";

            piece.style.fontSize =
                (Math.random() * 12 + 8) + "px";

            piece.style.opacity =
                Math.random() * .8 + .2;

            piece.style.color = "white";

            piece.style.filter =
                "drop-shadow(0 0 6px rgba(255,150,220,.8))";

            piece.style.animation =
                `introParticle ${
                    Math.random() * 3 + 2
                }s ease-in-out infinite`;

            piece.style.animationDelay =
                Math.random() * 2 + "s";

            confettiContainer.appendChild(piece);
        }
    }

    createIntroConfetti();


    /* =====================================
       ADD PARTICLE ANIMATION
    ===================================== */

    const particleStyle =
        document.createElement("style");

    particleStyle.textContent = `

        @keyframes introParticle {

            0% {
                transform:
                    translateY(0)
                    rotate(0deg)
                    scale(.7);

                opacity: .2;
            }

            50% {
                transform:
                    translateY(-35px)
                    rotate(180deg)
                    scale(1.2);

                opacity: 1;
            }

            100% {
                transform:
                    translateY(0)
                    rotate(360deg)
                    scale(.7);

                opacity: .2;
            }

        }

    `;

    document.head.appendChild(particleStyle);


    /* =====================================
       OPENING CELEBRATION
    ===================================== */

    setTimeout(() => {

        /* Existing confetti system */

        if (typeof launchConfetti === "function") {
            launchConfetti();
        }

    }, 1200);


    setTimeout(() => {

        if (typeof launchConfetti === "function") {
            launchConfetti();
        }

    }, 2600);


    setTimeout(() => {

        if (typeof createSparkles === "function") {
            createSparkles();
        }

    }, 1800);


    /* =====================================
       ENTER CELEBRATION
    ===================================== */

    function enterTheBirthday() {

        /* Big final confetti */

        if (typeof launchConfetti === "function") {

            launchConfetti();

            setTimeout(() => {
                launchConfetti();
            }, 500);

            setTimeout(() => {
                launchConfetti();
            }, 1000);

        }


        /* Play existing music */

        const birthdayMusic =
            document.getElementById("birthdayMusic");

        if (birthdayMusic) {

            birthdayMusic.volume = 0.7;

            birthdayMusic.play().catch(() => {

                console.log(
                    "Music requires user interaction."
                );

            });

        }


        /* Exit animation */

        birthdayIntro.classList.add("hide");


        /* Prevent intro from blocking website */

        setTimeout(() => {

            birthdayIntro.style.display =
                "none";

        }, 1200);

    }


    if (enterBirthday) {

        enterBirthday.addEventListener(
            "click",
            enterTheBirthday
        );

    }


    /* =====================================
       ESCAPE KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                birthdayIntro
            ) {

                enterTheBirthday();

            }

        }
    );

});