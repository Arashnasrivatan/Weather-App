function getGeocode() {
  var location = document.getElementById('location').value.trim();
  if(location != 'default1'){
  var apiKey = 'f8bfdf1cc8b344dda419d73ed895b826'; // کلید API خود را اینجا وارد کنید

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              var lat = data.results[0].geometry.lat;
              var lng = data.results[0].geometry.lng;

              return fetch(`https://api.dastyar.io/express/weather?lat=${lat}&lng=${lng}&lang=fa&theme=light`);
          } else {
              throw new Error('مکان یافت نشد');
          }
      })
      .then(response => response.json())
      .then(data => {
          if (data && data[0] && data[0].current !== undefined) {
              var temp = data[0].current;
              var description = data[0].customDescription.text
              var emoji = data[0].customDescription.emoji
              var icon = data[0].weather.icon
              var min = data[0].min + '°'
              var max = data[0].max + '°'
              document.getElementById('result').style.background = data[0].backgroundColor
              document.getElementById('temp').textContent = Math.round(temp) + '°'
              document.getElementById('temp').style.color = data[0].textColor
              document.getElementById('icon').src = `images/${icon}.svg`
              document.getElementById('description').textContent = `${emoji} ${description}`
              document.getElementById('dit').innerHTML = 'کمترین دما : <span id="min" class="fw-bold"></span> | بیشترین دما : <span id="max" class="fw-bold"></span>'
              document.getElementById('min').textContent = min
              document.getElementById('max').textContent = max

          } else {
              document.getElementById('result').textContent = 'اطلاعات آب و هوا یافت نشد';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('result').textContent = 'خطا در دریافت داده‌ها';
      });
}
}

const cities = [
  { fa: 'تهران', en: 'Tehran' },
  { fa: 'مشهد', en: 'Mashhad' },
  { fa: 'اصفهان', en: 'Isfahan' },
  { fa: 'کرج', en: 'Karaj' },
  { fa: 'شیراز', en: 'Shiraz' },
  { fa: 'تبریز', en: 'Tabriz' },
  { fa: 'قم', en: 'Qom' },
  { fa: 'اهواز', en: 'Ahvaz' },
  { fa: 'کرمانشاه', en: 'Kermanshah' },
  { fa: 'ارومیه', en: 'Urmia' },
  { fa: 'رشت', en: 'Rasht' },
  { fa: 'زاهدان', en: 'Zahedan' },
  { fa: 'همدان', en: 'Hamedan' },
  { fa: 'کرمان', en: 'Kerman' },
  { fa: 'یزد', en: 'Yazd' },
  { fa: 'اردبیل', en: 'Ardabil' },
  { fa: 'بندرعباس', en: 'Bandar Abbas' },
  { fa: 'اراک', en: 'Arak' },
  { fa: 'بوشهر', en: 'Bushehr' },
  { fa: 'بیرجند', en: 'Birjand' },
  { fa: 'خرم‌آباد', en: 'Khorramabad' },
  { fa: 'گرگان', en: 'Gorgan' },
  { fa: 'ساری', en: 'Sari' },
  { fa: 'قزوین', en: 'Qazvin' },
  { fa: 'سنندج', en: 'Sanandaj' },
  { fa: 'کیش', en: 'Kish' },
  { fa: 'قشم', en: 'Qeshm' },
  { fa: 'بجنورد', en: 'Bojnurd' },
  { fa: 'خرمشهر', en: 'Khorramshahr' },
  { fa: 'زنجان', en: 'Zanjan' },
  { fa: 'سمنان', en: 'Semnan' },
  { fa: 'سبزوار', en: 'Sabzevar' },
  { fa: 'کاشان', en: 'Kashan' },
  { fa: 'شهریار', en: 'Shahriar' },
  { fa: 'اسلامشهر', en: 'Eslamshahr' },
  { fa: 'ملایر', en: 'Malayer' },
  { fa: 'بابل', en: 'Babol' },
  { fa: 'خمینی‌شهر', en: 'Khomeyni Shahr' },
  { fa: 'نجف‌آباد', en: 'Najafabad' },
  { fa: 'ورامین', en: 'Varamin' },
  { fa: 'ساوه', en: 'Saveh' },
  { fa: 'دزفول', en: 'Dezful' },
  { fa: 'مراغه', en: 'Maragheh' },
  { fa: 'مهاباد', en: 'Mahabad' },
  { fa: 'مرودشت', en: 'Marvdasht' },
  { fa: 'یاسوج', en: 'Yasuj' },
  { fa: 'ایلام', en: 'Ilam' },
  { fa: 'آبادان', en: 'Abadan' },
  { fa: 'بندر انزلی', en: 'Bandar Anzali' },
  { fa: 'زابل', en: 'Zabol' },
  { fa: 'دهدشت', en: 'Dehdasht' },
  { fa: 'بهبهان', en: 'Behbahan' }
];
var select = document.getElementById('location')
// اضافه کردن گزینه‌ها به select
cities.forEach(city => {
  const option = document.createElement('option');
  option.value = city.en;
  option.textContent = city.fa;
  select.appendChild(option);
});