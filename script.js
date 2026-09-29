/* =========================================
   MASSAGE WEBSITE — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const mobileMenuCheckbox =
        document.getElementById("mobile-menu");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenuCheckbox) {
                mobileMenuCheckbox.checked = false;
            }
        });
    });


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId === "#booking"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       BOOKING MODAL
    ========================================= */

    const bookingModal =
        document.getElementById("bookingModal");

    const bookingOverlay =
        document.getElementById("bookingOverlay");

    const bookingClose =
        document.getElementById("bookingClose");

    const bookingForm =
        document.getElementById("bookingForm");

    const bookingSuccess =
        document.getElementById("bookingSuccess");

    const bookingSummary =
        document.getElementById("bookingSummary");

    const bookingDone =
        document.getElementById("bookingDone");


    /* =========================================
       BOOKING FORM ELEMENTS
    ========================================= */

    const customerName =
        document.getElementById("customerName");

    const customerPhone =
        document.getElementById("customerPhone");

    const serviceChoice =
        document.getElementById("serviceChoice");

    const bookingDate =
        document.getElementById("bookingDate");

    const bookingTime =
        document.getElementById("bookingTime");

    const bookingLocation =
        document.getElementById("bookingLocation");

    const bookingMessage =
        document.getElementById("bookingMessage");


    /* =========================================
       SET MINIMUM DATE TO TODAY
    ========================================= */

    if (bookingDate) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        bookingDate.min =
            `${year}-${month}-${day}`;
    }


    /* =========================================
       OPEN BOOKING MODAL
    ========================================= */

    function openBookingModal() {

        if (!bookingModal) return;

        bookingModal.classList.add("active");

        document.body.classList.add("modal-open");

        if (bookingForm) {
            bookingForm.style.display = "block";
        }

        if (bookingSuccess) {
            bookingSuccess.style.display = "none";
        }

        document.body.style.overflow = "hidden";
    }


    /* =========================================
       CLOSE BOOKING MODAL
    ========================================= */

    function closeBookingModal() {

        if (!bookingModal) return;

        bookingModal.classList.remove("active");

        document.body.classList.remove("modal-open");

        document.body.style.overflow = "";

    }


    /* =========================================
       ALL BOOKING BUTTONS
    ========================================= */

   document
    .querySelectorAll('a[href="#booking"], [data-booking-open]')
    .forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();

            bookingModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (bookingClose) {

        bookingClose.addEventListener(
            "click",
            closeBookingModal
        );

    }


    /* =========================================
       CLOSE WHEN CLICKING OVERLAY
    ========================================= */

    if (bookingOverlay) {

        bookingOverlay.addEventListener(
            "click",
            closeBookingModal
        );

    }


    /* =========================================
       CLOSE WITH ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            bookingModal &&
            bookingModal.classList.contains("active")
        ) {

            closeBookingModal();

        }

    });


    /* =========================================
       FORMAT DATE
    ========================================= */

    function formatDate(dateString) {

        if (!dateString) return "";

        const date =
            new Date(dateString + "T00:00:00");

        return date.toLocaleDateString(
            "en-SG",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    }


    /* =========================================
       CREATE BOOKING MESSAGE
    ========================================= */

    function createBookingMessage() {

        const name =
            customerName.value.trim();

        const phone =
            customerPhone.value.trim();

        const service =
            serviceChoice.value;

        const date =
            formatDate(bookingDate.value);

        const time =
            bookingTime.value;

        const location =
            bookingLocation.value.trim();

        const message =
            bookingMessage.value.trim();


        let bookingText =
`NEW MASSAGE BOOKING REQUEST

Name: ${name}

Phone / WhatsApp:
${phone}

Service:
${service}

Preferred Date:
${date}

Preferred Time:
${time}

Location:
${location}`;


        if (message) {

            bookingText +=
`

Special Request:
${message}`;

        }


        bookingText +=
`

Please confirm availability and booking details.`;

        return bookingText;

    }


    /* =========================================
       FORM SUBMISSION
    ========================================= */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* Browser validation */

                if (!bookingForm.checkValidity()) {

                    bookingForm.reportValidity();

                    return;

                }


                /* Create booking message */

                const bookingText =
                    createBookingMessage();


                /* Display summary */

                if (bookingSummary) {

                    bookingSummary.innerHTML = `

                        <div class="summary-item">
                            <span>NAME</span>
                            <strong>
                                ${escapeHTML(
                                    customerName.value
                                )}
                            </strong>
                        </div>

                        <div class="summary-item">
                            <span>SERVICE</span>
                            <strong>
                                ${escapeHTML(
                                    serviceChoice.value
                                )}
                            </strong>
                        </div>

                        <div class="summary-item">
                            <span>DATE</span>
                            <strong>
                                ${escapeHTML(
                                    formatDate(
                                        bookingDate.value
                                    )
                                )}
                            </strong>
                        </div>

                        <div class="summary-item">
                            <span>TIME</span>
                            <strong>
                                ${escapeHTML(
                                    bookingTime.value
                                )}
                            </strong>
                        </div>

                        <div class="summary-item">
                            <span>LOCATION</span>
                            <strong>
                                ${escapeHTML(
                                    bookingLocation.value
                                )}
                            </strong>
                        </div>

                    `;

                }


                /* Show success screen */

                bookingForm.style.display = "none";

                bookingSuccess.style.display = "block";


                /* Copy booking message */

                navigator.clipboard
                    .writeText(bookingText)
                    .catch(() => {
                        console.log(
                            "Clipboard access unavailable."
                        );
                    });

            }
        );

    }


    /* =========================================
       DONE BUTTON
    ========================================= */

    if (bookingDone) {

        bookingDone.addEventListener(
            "click",
            () => {

                closeBookingModal();

                if (bookingForm) {
                    bookingForm.reset();
                    bookingForm.style.display = "block";
                }

                if (bookingSuccess) {
                    bookingSuccess.style.display = "none";
                }

            }
        );

    }


    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .feature, .step, .review-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }

});