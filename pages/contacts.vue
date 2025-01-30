<template>
  <section class="contact-section">
    <div class="container">
      <div class="my-4 lead text-center">
        <h1>Наша автошкола находится по адресу:</h1>
        <h4>г. Краснодар, р-н Табачной фабрики, ул. Спортивная, д. 2, к. Л.</h4>
      </div>

      <!-- Map at the top -->
      <div class="map-container mb-4" ref="mapContainer">
        <ClientOnly>
          <div v-if="isMapVisible" style="position:relative;overflow:hidden;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=39.003489%2C45.043432&z=17&mode=search&whatshere%5Bpoint%5D=39.003489%2C45.043432&whatshere%5Bzoom%5D=17&controls=routeButtonControl,zoomControl&text=Автошкола%20Политех" 
              height="400" 
              frameborder="0" 
              allowfullscreen="true" 
              style="position:relative; width: 100%">
            </iframe>
          </div>
          <div v-else class="map-placeholder d-flex align-items-center justify-content-center">
            <div class="text-center">
              <div class="spinner-border text-primary mb-2" role="status">
                <span class="visually-hidden">Загрузка карты...</span>
        </div>
              <div>Загрузка карты...</div>
            </div>
          </div>
        </ClientOnly>
      </div>

      <div class="image-container mb-4 text-center">
        <img :src="images.enter" alt="Вход в автошколу" class="img-fluid">
      </div>

      <div class="row mb-4">
        <div class="col-md-6 lead">
          <h3>Свяжитесь с нами</h3>
          <p>Мы всегда готовы ответить на ваши вопросы и помочь вам!</p>
          <ul class="list-unstyled">
            <li><strong>Телефон:</strong> <a href="tel:+79615262359">+7-961-526-23-59</a></li>
            <li><strong>Электронная почта:</strong> <a href="mailto:avtoshkola-politekh@mail.ru">avtoshkola-politekh@mail.ru</a></li>
            <li><strong>Адрес:</strong> г. Краснодар, р-н Табачной фабрики, ул. Спортивная, д. 2, к. Л.</li>
            <li>
              <div>
                <strong>Рабочее время:</strong> Пн-Пт 9:00 - 17:00
              </div>
              <div>
                Сб-Вс - Выходной
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { contactsSeo } = usePageSeo()
contactsSeo()

const images = {
  enter: '/images/contacts/enter.JPG'
}

const mapContainer = ref(null)
const isMapVisible = ref(false)

const loadMap = () => {
  if (mapContainer.value) {
    isMapVisible.value = true
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMap()
        observer.disconnect()
      }
    })
  }, {
    rootMargin: '100px'
  })

  if (mapContainer.value) {
    observer.observe(mapContainer.value)
  }
})
</script>

<style lang="scss">
@import "assets/scss/pages/contacts.scss";
</style>