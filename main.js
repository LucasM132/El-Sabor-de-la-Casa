document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTabContainers();
    initPricingToggle();
    initPrintButton();

    initNewsletterFormSubmission();
    initContactFormValidation();
    initCheckoutValidation();
    initChallengeFormValidation();

    if (document.body.classList.contains('receta-page')) {
        initRecipeInteractions();
    }

    initInfiniteRecetasCarousel();
});
function initInfiniteRecetasCarousel() {
    const carousel = document.querySelector('.recetas-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!carousel || !prevBtn || !nextBtn) return;

    const originalCards = Array.from(carousel.querySelectorAll('.receta-card'));
    const N_original = originalCards.length;
    const N_clone = 4;
    const W_card_assumed = 220;

    originalCards.slice(-N_clone).reverse().forEach(card => {
        carousel.prepend(card.cloneNode(true));
    });

    originalCards.slice(0, N_clone).forEach(card => {
        carousel.appendChild(card.cloneNode(true));
    });

    const P_start_original = N_clone * W_card_assumed;

    carousel.scrollLeft = P_start_original;

    const scrollByCard = (direction) => {
        carousel.scrollBy({
            left: direction * W_card_assumed,
            behavior: 'smooth'
        });
    };

    nextBtn.addEventListener('click', () => scrollByCard(1));
    prevBtn.addEventListener('click', () => scrollByCard(-1));

    const navButtonsContainer = document.querySelector('.carousel-nav-buttons');
    if (navButtonsContainer) {
        navButtonsContainer.style.display = 'flex';
    }

    let isJumping = false;

    carousel.addEventListener('scroll', () => {
        if (isJumping) return;

        const currentScroll = carousel.scrollLeft;

        if (currentScroll >= P_start_original + (N_original * W_card_assumed) - (W_card_assumed / 2)) {
            isJumping = true;
            carousel.scrollLeft = P_start_original;
            setTimeout(() => { isJumping = false; }, 0);
            return;
        }

        if (currentScroll <= W_card_assumed / 2) {
            isJumping = true;
            const totalCloneWidth = N_clone * W_card_assumed;
            const jumpBackPosition = carousel.scrollWidth - totalCloneWidth - carousel.clientWidth;

            carousel.scrollLeft = jumpBackPosition;

            setTimeout(() => { isJumping = false; }, 0);
            return;
        }
    });
}

function createErrorMessage(formGroup) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    // Se inserta después del input o textarea
    const lastChild = formGroup.lastElementChild;
    if (lastChild) {
        lastChild.insertAdjacentElement('afterend', errorDiv);
    } else {
        formGroup.appendChild(errorDiv);
    }
    return errorDiv;
}
function validateRequired(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return true;

    const errorMessage = formGroup.querySelector('.error-message') || createErrorMessage(formGroup);

    if (input.value.trim() === '') {
        errorMessage.textContent = message;
        formGroup.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        errorMessage.textContent = '';
        formGroup.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        return true;
    }
}

function validatePattern(input, pattern, requiredMessage, patternMessage) {
    if (!validateRequired(input, requiredMessage)) {
        return false;
    }

    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message') || createErrorMessage(formGroup);

    if (!pattern.test(input.value.replace(/\s/g, ''))) {
        errorMessage.textContent = patternMessage;
        formGroup.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    }

    errorMessage.textContent = '';
    formGroup.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    return true;
}
function validateEmail(input) {
    if (!validateRequired(input, 'El correo electrónico es obligatorio.')) return false;

    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message') || createErrorMessage(formGroup);
    // Regex estándar para email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(input.value)) {
        errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
        formGroup.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        errorMessage.textContent = '';
        formGroup.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        return true;
    }
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (!menuToggle || !mainNav) {
        return;
    }

    const toggleMenu = (shouldOpen) => {
        const isOpen = (typeof shouldOpen === 'boolean') ? shouldOpen : !mainNav.classList.contains('active');

        mainNav.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => {
        toggleMenu();
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active') && window.innerWidth < 768) {
                toggleMenu(false);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}

function initTabContainers() {
    const tabContainerSelectors = document.querySelectorAll('.tabs-container');

    tabContainerSelectors.forEach(container => {
        const tabs = container.querySelectorAll('[role="tab"]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('aria-controls');
                const contentWrapper = container.nextElementSibling;

                tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                });
                if (contentWrapper) {
                    contentWrapper.querySelectorAll('.tab-content').forEach(c => {
                        c.classList.add('hidden');
                        c.setAttribute('hidden', 'true');
                    });
                }

                tab.setAttribute('aria-selected', 'true');

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                    targetContent.removeAttribute('hidden');
                }
            });
        });

        const activeTab = container.querySelector('[aria-selected="true"]');
        if (activeTab) {
        }
    });
}
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.pricing-toggle .toggle-btn');
    const monthlyCard = document.querySelector('.price-card.featured-plan');
    const annualCard = document.querySelector('.price-card.annual-plan');

    if (toggleButtons.length === 0 || !monthlyCard || !annualCard) return;

    const showPlan = (period) => {
        // Actualiza el estado visual de los botones
        toggleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === period);
        });

        if (period === 'mensual') {
            monthlyCard.style.display = 'flex';
            annualCard.style.display = 'none';
        } else if (period === 'anual') {
            monthlyCard.style.display = 'none';
            annualCard.style.display = 'flex';
        }
    };

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPlan(button.dataset.period);
        });
    });

    showPlan('mensual');
}
function initPrintButton() {
    const printButton = document.getElementById('btn-print-recipe');

    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
}
function initCookMode() {
    const cookModeBtn = document.getElementById('btn-cook-mode');
    const body = document.body;
    let wakeLock = null;

    if (!cookModeBtn) return;

    const requestWakeLock = async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
            } catch (err) {
                console.error('Error al solicitar Wake Lock:', err);
                wakeLock = null;
            }
        }
    };

    const toggleCookMode = () => {
        const isActive = body.classList.toggle('cook-mode-active');
        const actionBar = document.querySelector('.action-bar-float');

        if (isActive) {
            if (actionBar) actionBar.style.display = 'none';
            cookModeBtn.innerHTML = '<i class="fas fa-times"></i> <span class="btn-text">Salir</span>';
            requestWakeLock();
        } else {
            if (actionBar) actionBar.style.display = 'flex';
            cookModeBtn.innerHTML = '<i class="fas fa-utensils"></i> <span class="btn-text">Modo Cocina</span>';
            if (wakeLock) {
                wakeLock.release();
                wakeLock = null;
            }
        }
    };

    cookModeBtn.addEventListener('click', toggleCookMode);
}


function initIngredientCheckboxes() {
    const list = document.getElementById('ingredients-list');
    if (!list) return;

    list.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');
        }
    });
}

function initServingsAdjustment(input, originalServings, list, originalHtml) {
    const incrementBtn = document.getElementById('btn-increment-servings');
    const decrementBtn = document.getElementById('btn-decrement-servings');
    const currentServingsSpan = document.getElementById('current-servings');

    const updateIngredients = (newServings) => {
        list.innerHTML = originalHtml;
        currentServingsSpan.textContent = newServings;

        const factor = newServings / originalServings;

        list.querySelectorAll('li[data-quantity]').forEach(li => {
            const quantity = parseFloat(li.dataset.quantity);
            const unit = li.dataset.unit || '';

            if (!isNaN(quantity)) {
                const newQuantity = (quantity * factor);
                let formattedQuantity = newQuantity % 1 === 0 ? newQuantity.toString() : newQuantity.toFixed(1);

                const descriptionText = li.textContent.replace(/^[0-9.,]+\s*[a-zA-Z]*\s*de\s*/i, '').trim();

                li.textContent = `${formattedQuantity} ${unit} de ${descriptionText}`;
            }
        });
    };

    const handleAdjustment = (change) => {
        let current = parseInt(input.value);
        let newServings = current + change;

        if (newServings >= 1) {
            input.value = newServings;
            updateIngredients(newServings);
        }
    };

    if (incrementBtn) incrementBtn.addEventListener('click', () => handleAdjustment(1));
    if (decrementBtn) decrementBtn.addEventListener('click', () => handleAdjustment(-1));

    input.addEventListener('input', (event) => {
        const newServings = parseInt(event.target.value);
        if (!isNaN(newServings) && newServings >= 1) {
            updateIngredients(newServings);
        }
    });

    updateIngredients(originalServings);
}
function initRecipeInteractions() {
    const servingsCountInput = document.getElementById('servings-count');
    const ingredientsList = document.getElementById('ingredients-list');

    if (!servingsCountInput || !ingredientsList || !servingsCountInput.dataset.originalServings) {
        return;
    }

    const originalServings = parseInt(servingsCountInput.dataset.originalServings);
    const originalIngredientsHtml = ingredientsList.innerHTML;

    initCookMode();
    initIngredientCheckboxes();
    initServingsAdjustment(servingsCountInput, originalServings, ingredientsList, originalIngredientsHtml);
}

function initNewsletterFormSubmission() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    if (newsletterForms.length === 0) return;

    newsletterForms.forEach(form => {
        form.setAttribute('novalidate', true);
        const emailInput = form.querySelector('input[type="email"]');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const isEmailValid = validateEmail(emailInput);

            if (isEmailValid) {
                setTimeout(() => {
                    window.location.href = form.getAttribute('action');
                }, 500);
            } else {
                emailInput.focus();
            }
        });
    });
}
function initContactFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.setAttribute('novalidate', true);
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const isNombreValid = validateRequired(nombreInput, 'El nombre es obligatorio.');
        const isEmailValid = validateEmail(emailInput);
        const isMensajeValid = validateRequired(mensajeTextarea, 'El mensaje es obligatorio.');
        if (isNombreValid && isEmailValid && isMensajeValid) {
            formStatus.textContent = '✅ ¡Mensaje enviado con éxito! Te responderemos pronto.';
            formStatus.className = 'form-status-message success';
            form.reset();
            setTimeout(() => {
                window.location.href = form.getAttribute('action');
            }, 1000);

        } else {
            formStatus.textContent = '❌ Por favor, corrige los errores en el formulario.';
            formStatus.className = 'form-status-message error';
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
}
function initCheckoutValidation() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    form.setAttribute('novalidate', true);
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('card-expiry');
    const cvcInput = document.getElementById('card-cvc');
    const termsCheckbox = document.getElementById('terms');
    const finalCta = form.querySelector('.final-cta-pay');

    expiryInput.addEventListener('input', (e) => {
        const input = e.target;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        const cardRegex = /^[0-9]{13,16}$/;
        if (!validatePattern(cardNumberInput, cardRegex, 'Número de tarjeta es obligatorio.', 'Ingrese un número de tarjeta válido (13-16 dígitos).')) {
            isValid = false;
        }
        const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
        if (!validatePattern(expiryInput, expiryRegex, 'Fecha de vencimiento obligatoria.', 'Formato MM/AA inválido.')) {
            isValid = false;
        }
        const cvcRegex = /^[0-9]{3,4}$/;
        if (!validatePattern(cvcInput, cvcRegex, 'CVC obligatorio.', 'CVC inválido (3 o 4 dígitos).')) {
            isValid = false;
        }
        const requiredInputs = form.querySelectorAll('input[required]:not([type="checkbox"]), select[required]');
        requiredInputs.forEach(input => {
            if (input.id !== cardNumberInput.id && input.id !== expiryInput.id && input.id !== cvcInput.id) {
                const labelText = input.previousElementSibling ? input.previousElementSibling.textContent.split('<')[0].trim() : 'Este campo';
                if (!validateRequired(input, `El campo ${labelText} es obligatorio.`)) {
                    isValid = false;
                }
            }
        });

        if (!termsCheckbox.checked) {
            alert('Debes aceptar los Términos y Condiciones para continuar.');
            isValid = false;
        }

        if (isValid) {
            finalCta.textContent = 'Procesando Pago... 💳';
            finalCta.setAttribute('disabled', 'true');

            setTimeout(() => {
                window.location.href = form.getAttribute('action');
            }, 1500);
        } else {
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            alert('Por favor, revisa y corrige los datos de pago y facturación.');
        }
    });
}

function initChallengeFormValidation() {
    const form = document.getElementById('challenge-form');
    if (!form) return;

    form.setAttribute('novalidate', true);
    const participanteInput = document.getElementById('participante');
    const fotoInput = document.getElementById('foto');
    const premiumCheck = document.getElementById('premium-check');

    const displayErrorSimple = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message') || createErrorMessage(formGroup);
        if (message) {
            errorMessage.textContent = message;
            formGroup.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorMessage.textContent = '';
            formGroup.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        if (!validateRequired(participanteInput, 'Tu nombre o nickname es obligatorio.')) {
            isValid = false;
        }

        if (fotoInput.files.length === 0) {
            displayErrorSimple(fotoInput, 'Debes subir una foto de tu plato para participar.');
            isValid = false;
        } else {
            displayErrorSimple(fotoInput, '');
        }
        if (!premiumCheck.checked) {
            alert('Debes indicar si eres suscriptor Chef Pro para continuar (o puedes ignorar este campo si solo es para premiar).');
            isValid = false;
        }

        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Subiendo... 📤';
            submitButton.setAttribute('disabled', 'true');

            setTimeout(() => {
                window.location.href = form.getAttribute('action'); // Redirige a desafio-gracias.html
            }, 1500);
        } else {
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
};