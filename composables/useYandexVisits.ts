export const useYandexVisits = () => {
    const token = 'y0__xD8_IKzAxjl8TQg0dvNlRIIa8Ndm55sd608Lw9vt28d21SZzg'; // OAuth-токен Яндекс Метрики
    const counterId = '99609527'; // ID счётчика Яндекс Метрики
  
    const url = `https://api-metrika.yandex.net/stat/v1/data/bytime?id=${counterId}&metrics=ym:s:visits&date1=today&date2=today&group=day`;
  
    return useAsyncData('yandex-visits', async () => {
      try {
        const response = await $fetch(url, {
          headers: { Authorization: `OAuth ${token}` }
        });
  
        return response?.data?.[0]?.metrics?.[0]?.[0] || 0; // Количество посетителей
      } catch (error) {
        console.error('Ошибка получения данных из Метрики:', error);
        return 0;
      }
    });
  };
  