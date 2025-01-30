<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <NuxtLink to="/" class="navbar-brand">
                        <img :src="logo" alt="Автошкола Политех" height="40" class="mb-2"/>
                    </NuxtLink>
                    <p>Качественное обучение вождению для начинающих и профессионалов. Мы готовим водителей с гарантией успеха на дорогах.</p>
                </div>

                <div class="col-md-4">
                    <h5>Полезные ссылки</h5>
                    <ul class="list-unstyled">
                        <li><NuxtLink to="/pricing">Цены</NuxtLink></li>
                        <li><NuxtLink to="/blog">Новости</NuxtLink></li>
                        <li><NuxtLink to="/contacts">Контакты</NuxtLink></li>
                    </ul>
                </div>

                <div class="col-md-4">
                    <h5>Контакты</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-phone"></i>+7-961-526-23-59</li>
                        <li><i class="fas fa-envelope"></i>avtoshkola-politekh@mail.ru</li>
                        <li><i class="fas fa-map-marker-alt me-2"></i> г. Краснодар, р-н Табачной фабрики, ул. Спортивная, д. 2, к. Л. </li>
                    </ul>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12 text-center">
                   <a href="https://t.me/kubstu_official" target="_blank" rel="noopener noreferrer" class="social-link">
                        <i class="fab fa-telegram"></i>
                    </a>
                    <a href="https://vk.com/kubstu_official" target="_blank" rel="noopener noreferrer" class="social-link">
                        <i class="fab fa-vk"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="copyright">
            <p>&copy; {{ new Date().getFullYear() }} Автошкола Политех. Все права защищены.</p>
        </div>
    </footer>
</template>

<script setup>
import logo from '~/assets/images/logo.png'
</script>

<style lang="scss" scoped>
.footer {
    background-color: var(--bs-info);
    color: var(--bs-light);
    padding: 2rem 0;
    font-size: 0.875rem;

    h5 {
        margin-bottom: 1.25rem;
        font-weight: 600;
    }

    a {
        color: var(--bs-light);
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: underline;
        }
    }

    .fas, .fab {
        margin-right: 0.75rem;
        width: 1rem;
    }

    .copyright {
        text-align: center;
        padding-top: 1.5rem;
        margin-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        p {
            margin-bottom: 0;
        }
    }

    .social-links {
        a {
            margin: 0 0.75rem;
            font-size: 1.25rem;
        }
    }

    .social-link {
        margin: 0 0.75rem;
        font-size: 1.75rem;  // Увеличенный размер иконок
        
        &:hover {
            color: rgba(255, 255, 255, 0.8);
            transform: scale(1.1);  // Небольшая анимация при наведении
            transition: transform 0.2s ease;
        }
    }
}
</style>
