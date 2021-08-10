export function reformatDate(date: string): string
{
   const createDate = new Date(date);

   let dateTime = new Intl.DateTimeFormat('ru-ru', {
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
   }).format(createDate);

   const currentDate = new Date();
   currentDate.setHours(0, 0, 0, 0);
   createDate.setHours(0, 0, 0, 0);

   const daysDiff = +(Math.abs(currentDate.getTime() - createDate.getTime()) / (1000 * 3600 * 24)).toFixed(0);

   return (daysDiff === 0 ? 'Сегодня, ' : (daysDiff === 1 ? 'Вчера, ' : (daysDiff < 5 ? daysDiff + ' дня назад, ' : daysDiff + ' дней назад, '))) + dateTime;
}

export function getStatusName(status: string): string {
   const statuses: {[name: string]: string } = {
      "done": "Выполнен",
      "pending": "В процессе",
      "created": "Создан"
   };

   return statuses[status] ? statuses[status] : status;
}

