<template>
	<div class="container-fluid mb-5">
		<div class="row mb-6" v-for="(advantage, index) in advantages" :key="index">
			<div class="col-md-6 p-0" :class="{'order-md-2': index % 2 !== 0}">
				<div class="image-container">
					<img :src="advantage.image" class="img-fluid rounded-0" alt="advantage image">
				</div>
			</div>

			<div class="col-md-6 d-flex align-items-start p-4 text-block" :class="{'order-md-1': index % 2 !== 0}">
				<div class="background-container" :style="{ backgroundImage: `url(${advantage.background})` }"></div>
				<div class="content-overlay">
					<h3 class="display-5">{{ advantage.title }}</h3>
					<p class="lead">{{ advantage.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import advantage1Image from '~/assets/images/advantages/advantage-1-voditel.jpg'
import advantage1Background from '~/assets/images/advantages/advantage-1-hill.jpg'
import advantage2Image from '~/assets/images/advantages/advantage-2-car.jpg'
import advantage2Background from '~/assets/images/advantages/advantage-2-moto.jpg'
import advantage3Image from '~/assets/images/advantages/advantage-3-class.JPG'
import advantage3Background from '~/assets/images/advantages/advantage-3-class-2.jpg'

const advantages = [
	{
		title: 'Опытные инструкторы, Большой автодром',
		description: 'Наши инструкторы имеют многолетний опыт работы в области обучения вождению и проходят регулярные курсы повышения квалификации, чтобы оставаться в курсе новых правил дорожного движения и технологий. Каждый из них является сертифицированным специалистом, способным обучать как начинающих водителей, так и тех, кто хочет улучшить свои навыки. Мы понимаем, что каждому студенту нужен индивидуальный подход, и наши инструкторы готовы адаптировать методику обучения к уникальным потребностям и стилю обучения каждого ученика. Они не только учат навыкам вождения, но и обеспечивают поддерживающую и комфортную атмосферу, где студенты могут задавать вопросы и обсуждать свои страхи и сомнения. Кроме того, занятия проходят на своем (что немаловажно!), большом, автодроме, где Вы не будете стоять в очереди за другими учениками, ожидая возможности выполнить упражнение и тратя время Вашего занятия впустую! Этот факт позволяет максимально результативно проводить каждое занятие.',
		image: advantage1Image,
		background: advantage1Background,
	},
	{
		title: 'Автопарк',
		description: 'Учебный центр «Автошкола-Политех» предлагает своим ученикам обучение на автомобилях как с механической трансмиссией, так и с автоматической, что б Вы выбрали для себя максимально комфортное обучение. Каждое транспортное средство регулярно проходит техническое обслуживание и проверку, чтобы гарантировать максимальную безопасность во время занятий',
		image: advantage2Image,
		background: advantage2Background,
	},
	{
		title: 'Гибкий график обучения',
		description: 'Мы понимаем, что у каждого нашего студента свой ритм жизни и свои обязательства, поэтому предлагаем гибкий график занятий по практическому вождению, который позволяет каждому ученику находить оптимальное время для обучения. Практические занятия проходят в светлое время суток с 8.00 до 17.00 (в зависимости от продолжительности светового дня,  время может корректироваться), что обеспечивает максимальную безопасность начинающих водителей и соблюдение требований ГАИ для обучения в автошколах.  Теоретические занятия проходят в вечернее время, что позволяет нашим студентам обучаться после всей основной занятости рабочих дней. Наша цель — сделать обучение доступным для всех, а главное – получить качественные знания и навыки, которые останутся у Вас на всю жизнь и обеспечат Вашу безопасность на любых дорогах. У нас также есть возможность переноса занятий в случае, если у вас возникли непредвиденные обстоятельства, что делает наше обучение ещё более удобным и доступным для всех',
		image: advantage3Image,
		background: advantage3Background,
	},
]

defineComponent({
	name: 'Advantages'
})
</script>

<style scoped lang="scss">
.image-container {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}

.text-block {
	position: relative;
	overflow: hidden;
	min-height: 400px;
}

.background-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	opacity: 0.2;
	z-index: 1;
}

.content-overlay {
	position: relative;
	z-index: 2;
	width: 100%;
	padding: 2rem;
}
</style>