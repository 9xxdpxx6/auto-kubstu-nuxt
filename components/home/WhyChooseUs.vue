<template>
    <div class="container-fluid mb-5">
        <h2 class="text-center mb-4 display-4">Почему стоит выбрать именно нас</h2>
        <div class="row">
            <div class="col-lg-4 mb-3 mb-lg-0" v-for="(reason, index) in reasons" :key="index">
                <div class="card h-100 text-center mb-4 shadow-sm">
                    <div class="card-body">
                        <i :class="reason.icon" class="icon mb-3" v-animate-on-visible:[index]></i>
                        <h5 class="card-title display-6">{{ reason.title }}</h5>
                        <p class="card-text lean">{{ reason.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Add custom directive for intersection observer
const vAnimateOnVisible = {
    mounted: (el: HTMLElement, binding: { arg: number }) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove existing classes
                    el.classList.remove('rotate-br');
                    el.style.animationDelay = '';
                    
                    // Calculate delay based on index
                    const delay = (binding.arg || 0) * 0.06;
                    
                    // Set delay and add animation class
                    el.style.animationDelay = `${delay}s`;
                    void el.offsetWidth; // Trigger reflow
                    el.classList.add('rotate-br');
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(el);
    }
};

interface Reason {
    title: string;
    description: string;
    icon: string;
}

const reasons: Reason[] = [
	{
		title: 'Опытные инструкторы',
		description: 'Наши инструкторы — это настоящие профессионалы своего дела. Каждый из них имеет многолетний опыт работы в автошколе и прошел строгую аттестацию, что гарантирует высокое качество обучения. Мы понимаем, что для многих наших учеников вождение — это не только новый навык, но и важный шаг к независимости. Поэтому наши инструкторы используют индивидуальный подход к каждому ученику, учитывая его уровень подготовки, личные предпочтения и цели. Мы обеспечиваем не только качественное обучение, но и психологическую поддержку, помогая вам преодолеть страхи и уверенно сесть за руль.',
		icon: 'fas fa-user-graduate',
	},
	{
		title: 'Удобный График обучения',
		description: 'Мы понимаем, что у каждого ученика есть свои обязательства, будь то работа, учеба или семейные дела. Именно поэтому мы предлагаем гибкий график занятий по практическому вождению, который можно легко подстроить под ваши потребности. Вы можете выбрать удобное время для уроков, а также менять расписание по мере необходимости. Это позволяет нашим ученикам не только удобно планировать свое время, но и более эффективно усваивать материал, поскольку занятия не будут создавать дополнительных стрессов. Мы ценим ваше время и стараемся сделать процесс обучения максимально комфортным и доступным. Теоретическая часть обучения проходит в вечернее время, что дает возможность посещать занятия после основной занятости.',
		icon: 'fas fa-clock',
	},
	{
		title: 'Очная форма обучения',
		description: 'Каждое занятие проходит в очном формате, что помогает оптимально усвоить материал, задать интересующие вопросы, разобрать сложные для начинающих водителей ситуации и найти индивидуальный подход к каждому.  Кроме того, мы регулярно обновляем наши учебные программы, чтобы они соответствовали последним изменениям в правилах и технологиях вождения. В результате, наши ученики выезжают на дороги с полным пониманием и уверенностью.',
		icon: 'fas fa-chalkboard-teacher',
	},
];
</script>

<style lang="scss" scoped>
.icon {
    font-size: 40px;
    color: #007bff;
}

.card {
    transition: none !important;
    transform: none !important;
    &:hover {
        transform: none !important;
    }
}

$animation-name: rotate-br;
$duration: 0.4s;
$timing-function: cubic-bezier(0.455, 0.030, 0.515, 0.955);

.#{$animation-name} {
    animation: $animation-name $duration $timing-function reverse both;
    animation-delay: 0s; // Default delay
}

@keyframes #{$animation-name} {
    0% {
        transform: rotate(0);
        transform-origin: bottom right;
    }
    100% {
        transform: rotate(360deg);
        transform-origin: bottom right;
    }
}
</style>