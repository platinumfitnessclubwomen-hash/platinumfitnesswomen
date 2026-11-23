/* ==========================================================================
   Build the three branch pages + sitemap + robots.
   Run:  node build.mjs
   Edit the `branches` object to update copy, phone numbers, hours or offers.
   ========================================================================== */
import { writeFileSync } from 'node:fs';

const BASE = 'https://platinumfitnessclubwomen-hash.github.io/platinumfitnesswomen';
const BRAND = 'Platinum Fitness Club — Women Exclusive';
const WA = '919849340257';
const WA_DISPLAY = '98493 40257';

const SOCIAL = {
  facebook: 'https://www.facebook.com/womenexclusiveofficial',
  instagram: 'https://www.instagram.com/platinumwomenfitness',
  instagramSaidabad: 'https://www.instagram.com/platinumwomenfitnesssaidabad/'
};

const socialIcons = {
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.45-.1-2.45 0-4.15 1.5-4.15 4.25V9.9H7.7V13h2.7v8h3.1Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>'
};

const socialLinks = `
        <div class="footer__h footer__h--spaced">Follow us</div>
        <div class="footer__list">
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener">Facebook</a>
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${SOCIAL.instagramSaidabad}" target="_blank" rel="noopener">Instagram — Saidabad</a>
        </div>`;

const stars = (n = 5) =>
  Array.from({ length: n }, () =>
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.6 7 .9-5.2 4.9 1.4 7L12 18l-6.2 3.4 1.4-7L2 9.5l7-.9Z"/></svg>'
  ).join('');

const photo = (name) => `assets/img/src/${name}.jpg`;

const fmt12 = (t) => {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, '0')} ${suffix}`;
};

const ico = {
  clock: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><path d="M8 4.6V8l2.4 1.6"/></svg>',
  pin: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 14s-5-4.4-5-8a5 5 0 0 1 10 0c0 3.6-5 8-5 8Z"/><circle cx="8" cy="6" r="1.6"/></svg>',
  phone: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M4.5 2.5 6 6 4.7 7a9 9 0 0 0 4.3 4.3L10 10l3.5 1.5v2a1.4 1.4 0 0 1-1.6 1.4A12 12 0 0 1 3.1 5.9 1.4 1.4 0 0 1 4.5 4.3Z"/></svg>',
  arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>',
  ext: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg>',
  check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m3 8.5 3 3 7-7"/></svg>',
  north: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4"/></svg>'
};

const branches = [
  {
    slug: 'malakpet',
    short: 'Malakpet',
    initials: 'M',
    img: {
      hero: 'assets/img/src/w-power.jpg',
      story: 'assets/img/src/w-weights.jpg',
      work: ['w-latpull', 'w-class1', 'w-incl', 'w-senior1'],
      gallery: ['w-trainer', 'w-class1', 'w-senior2']
    },
    title: "Women's Gym in Malakpet, Hyderabad | Platinum Fitness Club",
    meta: 'Women-only gym in Malakpet, Hyderabad. 4.7 from 307 Google reviews, 500+ members. Clinical training, female trainers, free trial.',
    rating: '4.7',
    reviews: '307',
    members: '500+',
    phoneDisplay: '092810 22896',
    phoneRaw: '+919281022896',
    wa: WA,
    open: '06:00',
    close: '21:00',
    closeLabel: '9:00 pm',
    address: '1st Floor, Zudio Building, opp. Metro Pillar No. 1456, Anand Nagar Colony, Malakpet, Hyderabad, Telangana 500036',
    addressShort: '1st Floor, Zudio Building, opp. Metro Pillar 1456, Anand Nagar Colony, Malakpet, Hyderabad 500036',
    locality: 'Malakpet',
    region: 'Hyderabad',
    postal: '500036',
    geo: { lat: '17.37263', lng: '78.50519' },
    plus: '9GF4+33',
    landmark: 'Opposite Metro Pillar No. 1456, in the Zudio building — first floor, look for the Platinum board.',
    metro: 'Malakpet metro station is a short walk away.',
    nearby: ['Dilsukhnagar', 'Santoshnagar', 'LB Nagar', 'Koti', 'Chaderghat', 'Moosarambagh', 'Amberpet', 'Saidabad'],
    intro: 'Our Malakpet branch sits on the first floor of the Zudio building, a minute from Malakpet metro. It is the busiest of the three — and the one most members simply walk to.',
    story: [
      'The Malakpet branch is the club\'s city-side home: a full floor of strength and cardio equipment, a dedicated space for group classes, and separate changing rooms with lockers and showers. Being a minute from Malakpet metro makes it the easiest branch to reach before work or after a late shift.',
      'Trainers here run a high proportion of PCOS and thyroid programmes, and the early-morning crowd is a fixture. If you have been meaning to start but keep putting it off until "next month", this is the branch to walk into on a Monday.'
    ],
    amenities: ['Female trainers', 'Pilates & yoga', 'Zumba & aerobics', 'Cardio zone', 'Sauna & steam', 'Lockers & showers', 'PCOS & thyroid care'],
    reasons: [
      ['A minute from the metro', 'Opposite Metro Pillar 1456, on the first floor of the Zudio building — easy before work, after college, or on the way home.'],
      ['Clinically informed, at every age', 'PCOS, thyroid, diabetes and joint-friendly programmes, scaled from first-timers in their twenties to women in their sixties.'],
      ['Women on the floor, always', 'Female trainers, a women-only floor, and 500+ members who mostly live within a few kilometres of the branch.'],
      ['The busiest branch, for a reason', '4.7 from 307 reviews, and one of the highest volumes of PCOS and thyroid programmes in the club.']
    ],
    local: [
      'If you are looking for a women\'s gym near Malakpet, Dilsukhnagar or LB Nagar, the branch is a short drive from all three. We are opposite Metro Pillar 1456 — the same building as Zudio — so the commute is one stop on the metro, or a straight run down the main road from Koti and Chaderghat.',
      'Members also travel from Santoshnagar, Moosarambagh, Amberpet and Saidabad. If you are coming by metro, get off at Malakpet and walk; if you are driving, call ahead and the team will point you to the entrance and the lift.'
    ],
    programmes: [
      { title: 'Strength & conditioning', desc: 'Free weights, racks and machines with a female trainer checking form, not just counting reps.', tags: ['Free weights', 'Form coaching'] },
      { title: 'PCOS & thyroid programmes', desc: 'Strength-first plans built around insulin resistance, fatigue and hormonal weight gain.', tags: ['PCOS', 'Thyroid'] },
      { title: 'Sauna, steam & recovery', desc: 'Finish with heat, then a shower and a locker that is actually yours for the hour.', tags: ['Recovery', 'Lockers'] },
      { title: 'Cardio & group classes', desc: 'Treadmills, cross trainers and cycles, plus yoga, Zumba and aerobics through the week.', tags: ['Heart health', 'Group energy'] }
    ],
    quotes: [
      { text: 'The equipment is clean and well-maintained, the staff is incredibly friendly and helpful … the atmosphere is motivating without being intimidating. I highly recommend it.', who: 'Hoor Banu', rating: 5 },
      { text: 'The environment is safe, clean, and truly motivating for women of all fitness levels. A special shoutout to Trainer Raziya, who is understanding, approachable, and truly one of the best trainers.', who: 'Sudeeksha Thota', rating: 5 },
      { text: 'Hygienic, professional trainers, very comfortable environment to workout.', who: 'Google member review', rating: 5 },
      { text: 'Excellent gym ambience and peaceful place to do your workouts.', who: 'Google member review', rating: 5 }
    ],
    faq: [
      ['What are the Malakpet branch timings?', 'Monday to Saturday, 6:00 am to 9:00 pm. The branch is closed on Sundays.'],
      ['Is there a free trial?', 'Yes — a free trial session with a body assessment. Call the branch or WhatsApp 98493 40257 to book a slot, Monday to Saturday.'],
      ['How do I reach the branch?', 'We are on the first floor of the Zudio building, opposite Metro Pillar No. 1456 in Anand Nagar Colony. Malakpet metro station is a short walk away.'],
      ['Do you have women trainers?', 'Yes. Our floor trainers are women, and they lead the strength, PCOS and thyroid programmes.'],
      ['Which areas do you serve?', 'Members travel to us from Malakpet, Dilsukhnagar, Santoshnagar, LB Nagar, Koti, Chaderghat, Moosarambagh, Amberpet and Saidabad.'],
      ['Do you train women of all ages?', 'Yes. Members range from women in their twenties to women in their sixties. Every programme is scaled to age, experience and medical history, and older members train with a trainer nearby on machines chosen for joints and balance.'],
      ['Is the training clinically informed?', 'Yes — PCOS, thyroid, diabetes, hypertension, menopause, bone health and post-partum programmes are built around the guidance you bring from your doctor or physiotherapist. We are trainers, not doctors, and we do not diagnose or treat conditions.'],
      ["Is there a women's gym near Malakpet metro station?", 'Yes. Our Malakpet branch is a minute from Malakpet metro, opposite Pillar 1456 in the Zudio building. It is the easiest of our three branches to reach by metro.'],
      ['Do you offer PCOS and thyroid programmes in Malakpet?', "Yes. Malakpet trainers run a high proportion of PCOS and thyroid programmes, built around your doctor's guidance with strength-first plans and sensible cardio."],
      ['Can a complete beginner join the Malakpet branch?', 'Yes. Most members start with no gym experience. Your free trial includes a body assessment, and a female trainer stays with you on the floor while you learn the machines.']
    ]
  },
  {
    slug: 'attapur',
    short: 'Attapur',
    initials: 'A',
    img: {
      hero: 'assets/img/src/w-group.jpg',
      story: 'assets/img/src/w-trainer.jpg',
      work: ['w-lift', 'w-class2', 'w-group', 'w-trainer2'],
      gallery: ['w-class2', 'w-group', 'w-trainer2']
    },
    title: "Women's Gym in Attapur, Hyderabad | Platinum Fitness Club",
    meta: 'Women-only gym in Attapur, Hyderabad. 4.9 from 666 Google reviews, 500+ members. EMS, Pilates, clinical training, free trial.',
    rating: '4.9',
    reviews: '666',
    members: '500+',
    phoneDisplay: '098493 40257',
    phoneRaw: '+919849340257',
    wa: WA,
    open: '06:00',
    close: '21:00',
    closeLabel: '9:00 pm',
    address: 'Plot No. 396, 1st Floor, Shree Bhagya Laxmi Plaza, opp. Pillar No. 151, Attapur, Hyderabad, Telangana 500048',
    addressShort: 'Plot No. 396, 1st Floor, Shree Bhagya Laxmi Plaza, opp. Pillar No. 151, Attapur, Hyderabad 500048',
    locality: 'Attapur',
    region: 'Hyderabad',
    postal: '500048',
    geo: { lat: '17.36145', lng: '78.42820' },
    plus: '9C6H+H7',
    landmark: 'Opposite Pillar No. 151, first floor of Shree Bhagya Laxmi Plaza — above the shops, look for the Platinum board.',
    metro: 'A short auto ride from Mehdipatnam and Tolichowki.',
    nearby: ['Mehdipatnam', 'Tolichowki', 'Rajendranagar', 'Langar Houz', 'Gudimalkapur', 'Hyderguda', 'Bandlaguda', 'Aramghar'],
    intro: 'Attapur is our highest-rated branch — 4.9 from 666 reviews — on the first floor of Shree Bhagya Laxmi Plaza, opposite Pillar 151.',
    story: [
      'Attapur is the club at its most complete: a large strength floor, a cardio zone, space for group classes and recovery rooms for after. Members come from Mehdipatnam, Tolichowki and Rajendranagar, and the evening floor has the energy of a club that has been at it for years.',
      'If you are coming from the Financial District side, this is the straightest drive of the three. Come in the morning for a quieter floor, or after work when the music is up and the classes are full.'
    ],
    amenities: ['Female trainers', 'Pilates studio', 'EMS training', 'Sauna & steam', 'Group classes', 'Cardio zone', 'Lockers & showers', 'Nutrition guidance'],
    reasons: [
      ['The club\'s most complete floor', 'Strength, cardio, group-class space and recovery rooms on one floor — the branch most members picture when they think of Platinum.'],
      ['4.9 from 666 reviews', 'Our highest-rated branch, and the one with the longest waiting list for evening classes.'],
      ['Clinically informed, at every age', 'PCOS, thyroid, diabetes, menopause and joint-friendly programmes, with trainers who scale load to age and history.'],
      ['A physiotherapy clinic in the same building', 'Attapur shares its address with a physiotherapy clinic, which makes it the easiest branch for members managing an injury alongside training.']
    ],
    local: [
      'For women in Mehdipatnam, Tolichowki and Rajendranagar, Attapur is the straightest drive of our three branches: first floor of Shree Bhagya Laxmi Plaza, opposite Pillar No. 151. Members come from Langar Houz, Gudimalkapur, Hyderguda, Bandlaguda and Aramghar, and the evening floor fills up early.',
      'If you are searching for a women\'s gym near Attapur, call before you come and we will tell you exactly where to turn off the main road, where to park, and which lift takes you to the first floor.'
    ],
    programmes: [
      { title: 'Strength & conditioning', desc: 'A large free-weight floor with racks, cables and machines — and trainers who know the difference between sore and injured.', tags: ['Free weights', 'Machines'] },
      { title: 'Pilates & core', desc: 'Controlled, low-impact work for posture, deep core strength and recovery from desk-bound days.', tags: ['Posture', 'Low impact'] },
      { title: 'Zumba, yoga & aerobics', desc: 'The branch\'s group classes are the reason many members keep coming back through the week.', tags: ['Group energy'] },
      { title: 'Sauna, steam & recovery', desc: 'Finish with heat, then a shower and a locker that is actually yours for the hour.', tags: ['Recovery', 'Lockers'] }
    ],
    quotes: [
      { text: 'Newly joined at Platinum Women Exclusive and I am absolutely loving it! Best ladies gym with such a positive, safe and comfortable environment. The gym is very clean and well-maintained with great equipment.', who: 'Arefa Mohammadi', rating: 5 },
      { text: 'I had a really good experience at Platinum Gym! Raziya Parveen Ma’am is an amazing personal trainer — very supportive, motivating, patient, and dedicated.', who: 'Sumaiya Firdous', rating: 5 },
      { text: 'I am 62 years old, and I joined this gym one month ago. I really like the environment here. It is comfortable, positive, and welcoming. As a senior, I feel comfortable and confident working out here.', who: 'Shahnaz Parveen', rating: 5 },
      { text: 'The best thing about this place is its ambience and the facilities they provide.', who: 'Google member review', rating: 5 }
    ],
    faq: [
      ['What are the Attapur branch timings?', 'Monday to Saturday, 6:00 am to 9:00 pm. The branch is closed on Sundays.'],
      ['Is there a free trial?', 'Yes — a free trial session with a body assessment. Call the branch or WhatsApp 98493 40257 to book a slot, Monday to Saturday.'],
      ['How do I reach the branch?', 'We are on the first floor of Shree Bhagya Laxmi Plaza, opposite Pillar No. 151 in Attapur. Look for the Platinum board above the shops.'],
      ['Do you have Pilates and sauna?', 'Yes. Pilates and core work are part of the class schedule, and sauna and steam are available as recovery facilities. Confirm current class timings with the branch.'],
      ['Which areas do you serve?', 'Members travel to us from Attapur, Mehdipatnam, Tolichowki, Rajendranagar, Langar Houz, Gudimalkapur, Hyderguda and Bandlaguda.'],
      ['Do you train women of all ages?', 'Yes. Members range from women in their twenties to women in their sixties. Programming is scaled to age, experience and medical history — older members train with a trainer nearby, on machines chosen for joints and balance.'],
      ['Is the training clinically informed?', 'Yes — PCOS, thyroid, diabetes, hypertension, menopause, bone health and post-partum programmes are built around the guidance you bring from your doctor or physiotherapist. We are trainers, not doctors, and we do not diagnose or treat conditions.'],
      ['Where can I do EMS training near Attapur?', 'EMS is available at our Attapur branch only. It is a 20-minute low-impact session, useful if you are short on time or need a gentler start. Malakpet and Saidabad do not offer EMS.'],
      ['Are there group classes at the Attapur branch?', 'Yes. Attapur has space for group classes including yoga, Zumba and aerobics. Check the weekly timetable with the branch when you book your trial.'],
      ['Is Attapur convenient from Mehdipatnam and Tolichowki?', 'Yes. Members regularly travel from Mehdipatnam, Tolichowki, Rajendranagar and Langar Houz. The branch is opposite Pillar 151 on the first floor of Shree Bhagya Laxmi Plaza.']
    ]
  },
  {
    slug: 'saidabad',
    short: 'Saidabad',
    initials: 'S',
    img: {
      hero: 'assets/img/src/w-cardio.jpg',
      story: 'assets/img/src/w-bike.jpg',
      work: ['w-weights', 'w-cardio', 'w-latpull', 'w-bike'],
      gallery: ['w-cardio', 'w-bike', 'w-incl']
    },
    title: "Women's Gym in Saidabad, Hyderabad | Neo Platinum Fitness",
    meta: 'Women-only gym in Saidabad, Hyderabad. 5.0 from 40 Google reviews, 500+ members. Gym-only floor, female trainers, free trial.',
    rating: '5.0',
    reviews: '40',
    members: '500+',
    phoneDisplay: '092810 22891',
    phoneRaw: '+919281022891',
    wa: WA,
    open: '06:15',
    close: '20:30',
    closeLabel: '8:30 pm',
    address: '1st Floor, above Ratnadeep Supermarket, D. No. 16-2-835/C/1, Zahoor Bagh, Shankeshwar Bazar, Saidabad, Hyderabad, Telangana 500059',
    addressShort: '1st Floor, above Ratnadeep Supermarket, Zahoor Bagh, Shankeshwar Bazar, Saidabad, Hyderabad 500059',
    locality: 'Saidabad',
    region: 'Hyderabad',
    postal: '500059',
    geo: { lat: '17.35850', lng: '78.51900' },
    plus: '9G59+CJ',
    landmark: 'Above Ratnadeep Supermarket on the first floor, at Zahoor Bagh — the entrance is from the Shankeshwar Bazar side.',
    metro: 'A short ride from Dilsukhnagar and Malakpet.',
    nearby: ['Saidabad', 'Saroornagar', 'Dilsukhnagar', 'Madannapet', 'Champapet', 'Kothapet', 'Malakpet', 'Asmangadh'],
    intro: 'Our newest branch, above Ratnadeep Supermarket in Saidabad — 5.0 from 40 reviews, with new equipment and a calmer floor. Saidabad is a gym-only floor: no group classes, just equipment, space and trainers.',
    story: [
      'Saidabad opened most recently, which means the equipment is new, the floor is quiet, and the trainers have time for women who are just starting. It is smaller and calmer than Attapur — many members describe it as the easiest place to begin.',
      'Being above Ratnadeep means errands and a workout fit into one trip. Come in the morning for a nearly empty floor, or in the early evening for a one-to-one session. There are no group classes on this floor — the equipment is yours when you need it.'
    ],
    amenities: ['Female trainers', 'New equipment', 'Strength & cardio', 'Personal training', '1:1 mobility work', 'Lockers & showers', 'PCOS & thyroid care'],
    reasons: [
      ['New equipment, quieter floor', 'Our newest branch means newer machines, a calmer floor and more of a trainer\'s time — particularly in the morning.'],
      ['The easiest place to begin', 'Many members start here. Personal training is available for the first few weeks if you would like someone beside you.'],
      ['Clinically informed, at every age', 'PCOS, thyroid, post-partum and joint-friendly programmes, scaled for women from their twenties to their sixties.'],
      ['Above Ratnadeep', 'Errands and a workout in one trip — the branch is on the first floor, with the entrance from the Shankeshwar Bazar side.']
    ],
    local: [
      'For women in Saidabad, Saroornagar and Champapet, this is the closest Platinum branch. We are above Ratnadeep Supermarket at Zahoor Bagh, Shankeshwar Bazar, with members travelling in from Madannapet, Kothapet, Dilsukhnagar and Malakpet.',
      'If you are looking for a women\'s gym near Saidabad, call the branch and we will walk you through the entrance, the lift and the timings — the floor is quietest mid-morning and early afternoon.'
    ],
    programmes: [
      { title: 'Personal training', desc: 'One-to-one coaching for your first three months — the fastest way to learn the machines and build a habit.', tags: ['1:1', 'Beginners'] },
      { title: 'Strength for beginners', desc: 'A gentle, progressive introduction to weights, with a trainer beside you for the first sessions.', tags: ['Beginners', 'Form coaching'] },
      { title: 'Mobility & stretching', desc: 'One-to-one mobility and stretching work for posture, joints and the kind of calm a busy week takes away.', tags: ['1:1', 'Mobility'] },
      { title: 'Cardio & conditioning', desc: 'Treadmills, cross trainers and cycles for heart health and stamina, with a trainer on hand to set the pace.', tags: ['Cardio', 'All ages'] }
    ],
    quotes: [
      { text: 'Excellent gym with top-notch equipment and very flexible timings! The machines are all well-maintained and modern, perfect for both beginners and pros. Trainers are supportive and the atmosphere is very motivating.', who: 'Hena marryam', rating: 5 },
      { text: 'Feeling so delighted and healthy after joining here — from equipment to ambience everything is modern, the trainers and staff are also so knowledgeable and approachable. I definitely recommend to everyone.', who: 'porika shilpa', rating: 5 },
      { text: 'Really enjoying my experience here so far! The gym has a very comfortable and welcoming atmosphere with a clean, spacious and well-maintained environment. Even though I travel around 20 minutes to get here, I genuinely feel it’s worth the journey.', who: 'Hari Priya', rating: 5 },
      { text: 'A newly opened place with a very positive and comfortable atmosphere.', who: 'Google member review', rating: 5 }
    ],
    faq: [
      ['What are the Saidabad branch timings?', 'Monday to Saturday, 6:15 am to 8:30 pm. The branch is closed on Sundays.'],
      ['Is there a free trial?', 'Yes — a free trial session with a body assessment. Call the branch or WhatsApp 98493 40257 to book a slot, Monday to Saturday.'],
      ['How do I reach the branch?', 'We are on the first floor above Ratnadeep Supermarket at Zahoor Bagh, Shankeshwar Bazar, Saidabad. The entrance is from the Shankeshwar Bazar side.'],
      ['Is this a good branch for beginners?', 'Yes. Saidabad is our newest and calmest floor, and personal training is available if you would like a trainer beside you for the first few weeks.'],
      ['Do you run group classes at Saidabad?', 'No. Saidabad is a gym-only branch with no group classes on the floor. What you get is a quiet, well-equipped gym with female trainers, strength and cardio machines, personal training and one-to-one mobility work. If you want yoga, Pilates, Zumba or aerobics classes, our Malakpet and Attapur branches run those through the week.'],
      ['Which areas do you serve?', 'Members travel to us from Saidabad, Saroornagar, Dilsukhnagar, Madannapet, Champapet, Kothapet, Malakpet and Asmangadh.'],
      ['Do you train women of all ages?', 'Yes. Members range from women in their twenties to women in their sixties, and the branch is a particularly easy place for beginners. Every programme is scaled to age, experience and medical history.'],
      ['Is the training clinically informed?', 'Yes — PCOS, thyroid, post-partum, menopause and joint-friendly programmes are built around the guidance you bring from your doctor or physiotherapist. We are trainers, not doctors, and we do not diagnose or treat conditions.'],
      ['Is Saidabad a women-only gym?', 'Yes. The Saidabad floor is women-only, with female trainers and a private, comfortable setting above Ratnadeep Supermarket in Zahoor Bagh.'],
      ['What equipment is on the Saidabad floor?', 'You will find strength machines, free weights, cardio equipment and space for mobility and one-to-one mobility work. Personal training is available if you want a trainer beside you.'],
      ['Is EMS training available at Saidabad?', 'No. EMS training is offered at our Attapur branch only. Saidabad is a gym-only floor focused on strength, cardio and personal training.']
    ]
  }
];

const enquiryModal = () => `
<div class="enquiry" id="enquiry" aria-hidden="true">
  <div class="enquiry__backdrop" data-enquiry-close></div>
  <div class="enquiry__panel" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" aria-describedby="enquiry-desc">
    <button class="enquiry__close" type="button" data-enquiry-close aria-label="Close enquiry form">&times;</button>
    <div class="enquiry__head">
      <img class="enquiry__logo" src="assets/img/src/logo-web.png" alt="Platinum Fitness Club Women Exclusive" width="180" height="46">
      <p class="eyebrow">Women-only · Hyderabad</p>
      <h2 class="display-m" id="enquiry-title">Start with a <em class="serif-italic">conversation.</em></h2>
      <p id="enquiry-desc">Tell us what you're looking for. Your answers open in WhatsApp, ready to send to ${WA_DISPLAY}.</p>
    </div>
    <form class="enquiry__form" id="enquiry-form">
      <label>
        <span>Your name</span>
        <input type="text" name="name" autocomplete="name" placeholder="Your name" required>
      </label>
      <label>
        <span>Branch</span>
        <select name="branch" required>
          <option value="malakpet">Malakpet</option>
          <option value="attapur">Attapur</option>
          <option value="saidabad">Saidabad</option>
        </select>
      </label>
      <label>
        <span>I'm interested in</span>
        <select name="interest">
          <option>Free trial &amp; body assessment</option>
          <option>Membership / 3 months + 1 free</option>
          <option>Strength &amp; conditioning</option>
          <option>PCOS, thyroid or hormonal training</option>
          <option>Pilates, yoga or classes at Malakpet / Attapur</option>
          <option>Personal training</option>
          <option>EMS training (Attapur only)</option>
        </select>
      </label>
      <label>
        <span>Anything else?</span>
        <textarea name="message" rows="3" placeholder="Your goals, age group, health considerations…"></textarea>
      </label>
      <button class="btn btn--teal enquiry__submit" type="submit">
        Continue to WhatsApp
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"/></svg>
      </button>
      <a class="enquiry__fallback" id="enquiry-fallback" href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp only · ${WA_DISPLAY} ↗</a>
    </form>
  </div>
</div>`;

const openingScene = () => `
<div class="opening" id="opening" aria-hidden="true">
  <div class="opening__side opening__side--dark">
    <img class="opening__logo" src="assets/img/src/logo-web.png" alt="" width="420" height="190">
    <span class="opening__label">Platinum Fitness Club</span>
  </div>
  <div class="opening__side opening__side--cream">
    <img class="opening__logo" src="assets/img/src/stronger-every-day.png" alt="" width="420" height="241">
    <span class="opening__label">Stronger Every Day</span>
  </div>
  <div class="opening__rule" aria-hidden="true"></div>
  <button class="opening__skip" type="button">Skip intro</button>
</div>`;

const headerNumbers = () => `
<div class="header__numbers">
  <div class="wrap header__numbers-inner">
    <span class="header__numbers-label">Call us</span>
    <a href="tel:+919281022896"><span>Malakpet</span>092810 22896</a>
    <a href="tel:+919849340257"><span>Attapur</span>098493 40257</a>
    <a href="tel:+919281022891"><span>Saidabad</span>092810 22891</a>
    <a href="https://wa.me/${WA}" target="_blank" rel="noopener"><span>WhatsApp</span>98493 40257</a>
  </div>
</div>`;

const header = (branch) => `
<a class="skip" href="#main">Skip to content</a>
<header class="header header--over-hero" id="site-header">
  ${headerNumbers()}
  <div class="wrap header__inner">
    <a class="brand" href="index.html" aria-label="Platinum Fitness Club Women Exclusive — home">
      <img class="brand__logo" src="assets/img/src/logo-web.png" alt="Platinum Fitness Club Women Exclusive" width="200" height="52">
      <span class="brand__divider" aria-hidden="true"></span>
      <img class="brand__logo brand__logo--second" src="assets/img/src/stronger-every-day.png" alt="Stronger Every Day" width="150" height="86">
    </a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="index.html">Home</a>
      <a class="nav__link" href="malakpet.html"${branch.slug === 'malakpet' ? ' aria-current="page"' : ''}>Malakpet</a>
      <a class="nav__link" href="attapur.html"${branch.slug === 'attapur' ? ' aria-current="page"' : ''}>Attapur</a>
      <a class="nav__link" href="saidabad.html"${branch.slug === 'saidabad' ? ' aria-current="page"' : ''}>Saidabad</a>
      <a class="nav__link" href="index.html#membership">Membership</a>
      <a class="nav__link" href="index.html#faq">FAQ</a>
    </nav>
    <div class="header__cta">
      <a class="header__phone" href="tel:${branch.phoneRaw}">
        ${ico.phone}
        ${branch.phoneDisplay}
      </a>
      <button class="btn btn--ghost btn--sm js-enquire" type="button">Enquire</button>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span></button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" aria-hidden="true">
  <nav class="drawer__nav" aria-label="Mobile">
    <a class="drawer__link" href="index.html"><span>01</span>Home</a>
    <a class="drawer__link" href="malakpet.html"><span>02</span>Malakpet</a>
    <a class="drawer__link" href="attapur.html"><span>03</span>Attapur</a>
    <a class="drawer__link" href="saidabad.html"><span>04</span>Saidabad</a>
    <a class="drawer__link" href="index.html#membership"><span>05</span>Membership</a>
  </nav>
  <div class="drawer__brand">
    <img class="brand__logo" src="assets/img/src/logo-web.png" alt="" width="190" height="48">
  </div>
  <div class="drawer__foot">
    <p class="micro" style="color:var(--muted-light)">${branch.short} · Women-only</p>
    <a class="drawer__phone" href="tel:${branch.phoneRaw}">${branch.phoneDisplay}</a>
  </div>
</div>`;

const footer = (branch) => `
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="brand" href="index.html" aria-label="Platinum Fitness Club Women Exclusive — home">
          <img class="brand__logo brand__logo--footer" src="assets/img/src/logo-web.png" alt="Platinum Fitness Club Women Exclusive" width="200" height="52">
        </a>
        <p class="footer__blurb">A women-only fitness club in Hyderabad. Three branches, female trainers, and programmes built around real women's bodies and schedules.</p>
        <div class="footer__social">
          <a href="https://wa.me/${branch.wa}" target="_blank" rel="noopener" aria-label="WhatsApp ${branch.short}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4 5.3 5.3 0 0 0 3.2.6 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z"/></svg>
          </a>
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Platinum Fitness Club on Facebook">${socialIcons.facebook}</a>
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Platinum Fitness Club on Instagram">${socialIcons.instagram}</a>
          <a href="https://www.google.com/maps/search/${encodeURIComponent('Platinum Fitness Club Women Exclusive ' + branch.short + ' Hyderabad')}" target="_blank" rel="noopener" aria-label="Google reviews for ${branch.short}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.6 7 .9-5.2 4.9 1.4 7L12 18l-6.2 3.4 1.4-7L2 9.5l7-.9Z"/></svg>
          </a>
          <a href="tel:${branch.phoneRaw}" aria-label="Call ${branch.short}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 3.5 9 8l-2 1.6a12.5 12.5 0 0 0 6.9 6.9L15.5 14l4.5 2.4v3.1a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2h1.1Z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <div class="footer__h">Our Branches</div>
        <div class="footer__list">
          <a href="malakpet.html">Malakpet</a>
          <a href="attapur.html">Attapur</a>
          <a href="saidabad.html">Saidabad</a>
        </div>
      </div>
      <div>
        <div class="footer__h">The club</div>
        <div class="footer__list">
          <a href="index.html#programmes">Programmes</a>
          <a href="index.html#membership">Membership</a>
          <a href="index.html#reviews">Reviews</a>
          <a href="index.html#faq">FAQ</a>
        </div>${socialLinks}
      </div>
      <div>
        <div class="footer__h">${branch.short} branch</div>
        <div class="footer__list">
          <span>${branch.addressShort}</span>
          <a href="tel:${branch.phoneRaw}">${branch.phoneDisplay}</a>
          <span>Mon–Sat · ${branch.open.replace(':', '.')} – ${branch.closeLabel}<br>Sunday closed</span>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>2026</span> Platinum Fitness Club — Women Exclusive. All rights reserved.</span>
      <span>Malakpet · Attapur · Saidabad, Hyderabad</span>
    </div>
  </div>
</footer>

<div class="mobile-cta" aria-label="Quick actions">
  <a href="tel:${branch.phoneRaw}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6.6 3.5 9 8l-2 1.6a12.5 12.5 0 0 0 6.9 6.9L15.5 14l4.5 2.4v3.1a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2h1.1Z"/></svg>
    Call
  </a>
  <a href="https://wa.me/${branch.wa}?text=${encodeURIComponent(`Hi, I'd like to book a free trial at the ${branch.short} branch.`)}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Z"/></svg>
    WhatsApp
  </a>
  <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}" target="_blank" rel="noopener">
    ${ico.north}
    Directions
  </a>
</div>`;

function page(b) {
  const url = `${BASE}/${b.slug}.html`;
  const mapSrc = `https://maps.google.com/maps?q=${b.geo.lat},${b.geo.lng}&z=17&hl=en&output=embed`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.address)}`;
  const gbpUrl = `https://www.google.com/maps/search/${encodeURIComponent('Platinum Fitness Club Women Exclusive ' + b.short + ' Hyderabad')}`;
  const waUrl = `https://wa.me/${b.wa}?text=${encodeURIComponent(`Hi, I'd like to book a free trial at the ${b.short} branch.`)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthClub',
        '@id': `${url}#gym`,
        name: `Platinum Fitness Club Women Exclusive — ${b.short}`,
        alternateName: b.slug === 'saidabad' ? 'Neo Platinum Fitness Club - Women Exclusive' : undefined,
        description: `${b.meta} Located at ${b.addressShort}.`,
        url,
        telephone: b.phoneRaw,
        image: `${BASE}/assets/img/og.png`,
        logo: `${BASE}/assets/img/logo.svg`,
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Card',
        address: {
          '@type': 'PostalAddress',
          streetAddress: b.address,
          addressLocality: b.locality,
          addressRegion: 'Telangana',
          postalCode: b.postal,
          addressCountry: 'IN'
        },
        geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
        hasMap: gbpUrl,
        sameAs: [gbpUrl, SOCIAL.facebook, SOCIAL.instagram, ...(b.slug === 'saidabad' ? [SOCIAL.instagramSaidabad] : [])],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: b.open,
            closes: b.close
          }
        ],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: b.rating, reviewCount: b.reviews, bestRating: '5' },
        review: b.quotes.map((q) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: q.who },
          reviewRating: { '@type': 'Rating', ratingValue: String(q.rating || 5), bestRating: '5' },
          reviewBody: q.text
        })),
        amenityFeature: b.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
        areaServed: b.nearby.map((n) => ({ '@type': 'Place', name: n })),
        slogan: 'Women exclusive. Every age.',
        knowsAbout: [
          'Clinical fitness',
          'PCOS training',
          'Thyroid friendly training',
          'Menopause and bone health',
          'Post-partum recovery',
          'Strength training for women',
          ...(b.slug === 'attapur' ? ['EMS training'] : [])
        ],
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Active members', value: b.members },
          { '@type': 'PropertyValue', name: 'Minimum age', value: '18' }
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            name: 'Free trial and body assessment',
            description: 'One complimentary trial session with a body assessment and branch walkthrough, Monday to Saturday.',
            category: 'Trial membership',
            availability: 'https://schema.org/InStock'
          },
          {
            '@type': 'Offer',
            name: '3 months + 1 month free',
            description: 'Current offer for new members: pay for three months and train for four, subject to seats available.',
            category: 'Membership',
            availability: 'https://schema.org/LimitedAvailability'
          }
        ],
        isAccessibleForFree: false,
        publicAccess: false,
        smokingAllowed: false,
        parentOrganization: { '@id': `${BASE}/#organization` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Our Branches', item: `${BASE}/#branches` },
          { '@type': 'ListItem', position: 3, name: b.short, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: b.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${b.title}</title>
<meta name="description" content="${b.meta}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#160F1A">
<meta name="geo.region" content="IN-TG">
<meta name="geo.placename" content="${b.locality}, Hyderabad">
<meta name="geo.position" content="${b.geo.lat};${b.geo.lng}">
<meta name="ICBM" content="${b.geo.lat}, ${b.geo.lng}">
<link rel="preload" as="image" href="${b.img.hero}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${b.title}">
<meta property="og:description" content="${b.meta}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${BRAND} — ${b.short}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${b.title}">
<meta name="twitter:description" content="${b.meta}">
<meta name="twitter:image" content="${BASE}/assets/img/og.png">
<meta name="twitter:image:alt" content="${BRAND} — ${b.short}">

<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css?v=2">
<script>document.documentElement.classList.add('js');</script>
<script type="application/ld+json">
${JSON.stringify(schema, (k, v) => (v === undefined ? undefined : v), 2)}
</script>
</head>
<body data-page="${b.slug}">
${header(b)}

<main id="main">

  <section class="branch-hero grain">
    <div class="branch-hero__photo" style="background-image:url('${b.img.hero}')" aria-hidden="true"></div>
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="wrap branch-hero__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>
        <a href="index.html#branches">Our Branches</a>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>
        <span>${b.short}</span>
      </nav>

      <div class="branch-hero__grid">
        <div>
          <p class="eyebrow" data-reveal>Women-exclusive branch · ${b.locality}</p>
          <h1 class="branch-hero__title" data-reveal data-reveal-delay="1">
            ${b.short}
            <span>Platinum Fitness Club · Women Exclusive</span>
          </h1>
          <div class="branch-hero__badges" data-reveal data-reveal-delay="2">
            <span class="pill">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.6 7 .9-5.2 4.9 1.4 7L12 18l-6.2 3.4 1.4-7L2 9.5l7-.9Z"/></svg>
              ${b.rating} · ${b.reviews} Google reviews
            </span>
            <span class="pill pill--live" data-hours data-open="${b.open}" data-close="${b.close}">Open · closes ${b.closeLabel}</span>
            <span class="pill">Free trial &amp; body assessment</span>
            <span class="pill">${b.members} active members</span>
          </div>
          <p class="branch-hero__addr" data-reveal data-reveal-delay="2">${b.addressShort}</p>
          <div class="branch-hero__actions" data-reveal data-reveal-delay="3">
            <a class="btn btn--teal" href="${waUrl}" target="_blank" rel="noopener">
              Book a free trial
              ${ico.arrow}
            </a>
            <a class="btn btn--outline-light" href="${dirUrl}" target="_blank" rel="noopener">Get directions</a>
          </div>
        </div>

        <aside class="branch-panel" data-reveal data-reveal-delay="2" aria-label="Branch details">
          <div class="branch-panel__brand">
            <img class="brand__logo" src="assets/img/src/logo-web.png" alt="" width="180" height="46">
            <span class="micro">${b.short} branch</span>
          </div>
          <dl style="margin:0">
            <div class="branch-panel__row">
              <dt>Rating</dt>
              <dd>${b.rating} / 5 · ${b.reviews} reviews</dd>
            </div>
            <div class="branch-panel__row">
              <dt>Members</dt>
              <dd>${b.members} active</dd>
            </div>
            <div class="branch-panel__row">
              <dt>Mon – Sat</dt>
              <dd>${fmt12(b.open)} – ${fmt12(b.close)}</dd>
            </div>
            <div class="branch-panel__row">
              <dt>Sunday</dt>
              <dd>Closed</dd>
            </div>
            <div class="branch-panel__row">
              <dt>Phone</dt>
              <dd><a href="tel:${b.phoneRaw}">${b.phoneDisplay}</a></dd>
            </div>
            <div class="branch-panel__row">
              <dt>Plus code</dt>
              <dd>${b.plus} ${b.locality}</dd>
            </div>
          </dl>
          <a class="btn btn--light btn--block" href="tel:${b.phoneRaw}">Call the branch</a>
        </aside>
      </div>
    </div>
  </section>

  <section class="facts">
    <div class="wrap facts__grid">
      <div class="fact">
        ${ico.clock}
        <div><div class="fact__k">Timings</div><div class="fact__v">Mon – Sat<small>${fmt12(b.open)} – ${fmt12(b.close)} · Sunday closed</small></div></div>
      </div>
      <div class="fact">
        ${ico.phone}
        <div><div class="fact__k">Direct line</div><div class="fact__v"><a href="tel:${b.phoneRaw}">${b.phoneDisplay}</a><small>Call · WhatsApp ${WA_DISPLAY}</small></div></div>
      </div>
      <div class="fact">
        ${ico.check}
        <div><div class="fact__k">First visit</div><div class="fact__v">Free trial<small>With body assessment</small></div></div>
      </div>
      <div class="fact">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="6" cy="5.2" r="2.2"/><path d="M2 13v-1.4a4 4 0 0 1 8 0V13M11 4.2a2 2 0 0 1 0 4M12 13v-1.4a4 4 0 0 0-1.4-3"/></svg>
        <div><div class="fact__k">Members</div><div class="fact__v">${b.members} active<small>All ages · women-only floor</small></div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap story">
      <div data-reveal>
        <p class="eyebrow">The branch</p>
        <h2 class="display-m" style="margin-top:18px">A women-only floor in the middle of ${b.locality}.</h2>
        <p class="lede" style="margin-top:22px">${b.intro}</p>
        <p class="body-muted" style="font-size:.95rem">${b.story[0]}</p>
        <p class="body-muted" style="font-size:.95rem">${b.story[1]}</p>
        <div class="amenities">
          ${b.amenities.map((a) => `<span class="amenity">${ico.check}${a}</span>`).join('\n          ')}
        </div>
      </div>
      <div class="story__art" data-reveal data-reveal-delay="2">
        <div class="story__photo" style="background-image:url('${b.img.story}')" role="img" aria-label="Women training at the ${b.short} branch"></div>
        <div class="story__frame" aria-hidden="true"></div>
        <span class="story__monogram" aria-hidden="true">${b.initials}</span>
        <div class="story__caption">
          <span class="micro">${b.short} branch</span>
          <p>${b.metro}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--cream2">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" data-reveal>On the floor</p>
          <h2 class="display-l section-head__title" data-reveal data-reveal-delay="1">What you can train <em class="serif-italic">at ${b.short}.</em></h2>
        </div>
        <p class="section-head__aside" data-reveal data-reveal-delay="2">Every programme below is included in a standard membership, unless marked as personal training. Ask the team what is running this week.</p>
      </div>
      <div class="programs">
        ${b.programmes
          .map(
            (p, i) => `<article class="program program--wide program--photo" data-reveal data-reveal-delay="${i % 2}">
          <div class="program__bg" style="background-image:url('${photo(b.img.work[i])}')" aria-hidden="true"></div>
          <div class="program__body">
            <div class="program__top">
              <span class="program__no">0${i + 1}</span>
              ${ico.check}
            </div>
            <h3 class="program__title">${p.title}</h3>
            <p class="program__desc">${p.desc}</p>
            <div class="program__tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
        </article>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section gallery-section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" data-reveal>Inside the branch</p>
          <h2 class="display-l section-head__title" data-reveal data-reveal-delay="1">A look at the floor <em class="serif-italic">at ${b.short}.</em></h2>
        </div>
        <p class="section-head__aside" data-reveal data-reveal-delay="2">Real training, real women, real equipment. Come and see the floor for yourself on a free trial.</p>
      </div>
      <div class="gallery">
        ${b.img.gallery
          .map(
            (g, i) => `<figure class="gallery__item gallery__item--${i + 1}" data-reveal data-reveal-delay="${i}">
          <div class="gallery__img" style="background-image:url('${photo(g)}')" role="img" aria-label="Women training at Platinum ${b.short}"></div>
          <figcaption><span class="micro">0${i + 1} · ${b.short}</span><span>${['The strength floor', 'Trained by women', 'A floor that is yours'][i]}</span></figcaption>
        </figure>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--tight offer grain">
    <div class="wrap offer__inner">
      <div class="offer__num" data-reveal>3+1<small>Months</small></div>
      <div data-reveal data-reveal-delay="1">
        <h2 class="offer__title">Pay for three months. Train for four.</h2>
        <p class="offer__note">The current offer for new members at ${b.short}, subject to seats available. Message the branch for the plan sheet and we will confirm your inclusions in writing.</p>
      </div>
      <a class="btn btn--light" href="${waUrl}" target="_blank" rel="noopener" data-reveal data-reveal-delay="2">Ask about 3+1 ${ico.arrow}</a>
    </div>
  </section>

  <section class="section" id="visit">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" data-reveal>Getting here</p>
          <h2 class="display-l section-head__title" data-reveal data-reveal-delay="1">Find the <em class="serif-italic">${b.short} branch.</em></h2>
        </div>
        <a class="link-arrow" href="${dirUrl}" target="_blank" rel="noopener" data-reveal data-reveal-delay="2">Open in Google Maps ${ico.ext}</a>
      </div>

      <div class="location">
        <div class="location__map" data-reveal>
          <iframe src="${mapSrc}" title="Map showing Platinum Fitness Club Women Exclusive ${b.short}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
        <div class="location__info" data-reveal data-reveal-delay="1">
          <p class="micro">Address</p>
          <p style="font-size:1.02rem;line-height:1.65;margin-top:8px">${b.address}</p>
          <div class="landmarks">
            <div class="landmark">${ico.pin}<span>${b.landmark}</span></div>
            <div class="landmark">${ico.north}<span>${b.metro}</span></div>
            <div class="landmark">${ico.phone}<span><a href="tel:${b.phoneRaw}" style="border-bottom:1px solid var(--line-strong)">${b.phoneDisplay}</a> · WhatsApp ${WA_DISPLAY}</span></div>
          </div>

          <table class="hours-table" style="margin-top:28px">
            <caption class="micro" style="text-align:left;margin-bottom:6px">Opening hours</caption>
            <tbody>
              <tr><th scope="row">Monday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr><th scope="row">Tuesday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr><th scope="row">Wednesday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr><th scope="row">Thursday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr><th scope="row">Friday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr><th scope="row">Saturday</th><td>${fmt12(b.open)} – ${fmt12(b.close)}</td></tr>
              <tr class="is-closed"><th scope="row">Sunday</th><td>Closed</td></tr>
            </tbody>
          </table>

          <div class="nearby">
            <p class="micro">Women travel to ${b.short} from</p>
            <div class="nearby__chips">
              ${b.nearby.map((n) => `<span class="chip">${n}</span>`).join('\n              ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--cream2">
    <div class="wrap">
      <div class="local-note">
        <div class="local-note__copy" data-reveal>
          <p class="eyebrow">Local to ${b.short}</p>
          <h2 class="display-m" style="margin-top:16px">A women's gym that is actually near you.</h2>
          <p style="margin-top:20px">${b.local[0]}</p>
          <p>${b.local[1]}</p>
        </div>
        <div class="local-note__stat" data-reveal data-reveal-delay="1">
          <div class="num">${b.members}</div>
          <div class="lbl">Active members at ${b.short}</div>
          <div class="hr"></div>
          <p>Most live within a short drive of the branch. Walk in for a free trial and see the floor at the time you would actually train.</p>
          <div class="nearby__chips" style="margin-top:18px">
            ${b.nearby.slice(0, 6).map((n) => `<span class="chip">${n}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" data-reveal>Why women choose ${b.short}</p>
          <h2 class="display-l section-head__title" data-reveal data-reveal-delay="1">Four reasons this floor <em class="serif-italic">works.</em></h2>
        </div>
        <p class="section-head__aside" data-reveal data-reveal-delay="2">The same standard at all three branches, with the character of the neighbourhood it sits in.</p>
      </div>
      <div class="clinical clinical--two">
        ${b.reasons
          .map(
            (r, i) => `<article class="reason" data-reveal data-reveal-delay="${i % 2}">
          <span class="reason__no">0${i + 1}</span>
          <h3>${r[0]}</h3>
          <p>${r[1]}</p>
        </article>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--cream2">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow" data-reveal>Reviews</p>
          <h2 class="display-l section-head__title" data-reveal data-reveal-delay="1">${b.rating} from ${b.reviews} <em class="serif-italic">Google reviews.</em></h2>
        </div>
        <a class="link-arrow" href="${gbpUrl}" target="_blank" rel="noopener" data-reveal data-reveal-delay="2">Read all reviews ${ico.ext}</a>
      </div>

      <div class="reviews">
        ${b.quotes
          .map(
            (q, i) => `<article class="review" data-reveal data-reveal-delay="${i}">
          <span class="review__stars" role="img" aria-label="${q.rating || 5} out of 5">${stars(q.rating || 5)}</span>
          <blockquote class="review__quote">“${q.text}”</blockquote>
          <div class="review__foot">
            <div>
              <div class="review__who">${q.who}</div>
              <div class="review__where">${b.short} · Google</div>
            </div>
            <svg class="review__g" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.4 5.4 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5Z"/><path fill="#34A853" d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.6 13.7a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3Z"/><path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.3l3.8 3C6.5 6.6 9 4.6 12 4.6Z"/></svg>
          </div>
        </article>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap faq">
      <div>
        <p class="eyebrow" data-reveal>${b.short} questions</p>
        <h2 class="display-l" style="margin-top:18px" data-reveal data-reveal-delay="1">Before you <em class="serif-italic">visit.</em></h2>
        <p class="body-muted" style="margin-top:22px;max-width:32ch;font-size:.92rem" data-reveal data-reveal-delay="2">Call the branch and a real person will answer — Monday to Saturday, during opening hours.</p>
        <a class="btn btn--ghost" style="margin-top:22px" href="tel:${b.phoneRaw}" data-reveal data-reveal-delay="3">Call ${b.phoneDisplay}</a>
      </div>
      <div class="faq__list" data-reveal data-reveal-delay="2">
        ${b.faq
          .map(
            ([q, a]) => `<details>
          <summary>${q} <span class="plus" aria-hidden="true"></span></summary>
          <p>${a}</p>
        </details>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--tight cta-band grain">
    <div class="cta-band__photo" style="background-image:url('${b.img.hero}')" aria-hidden="true"></div>
    <div class="cta-band__arches" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="#FBF5F2" stroke-opacity=".5">
          <path d="M1050 500V250a150 150 0 0 1 300 0v250"/>
          <path d="M1110 500V252a90 90 0 0 1 180 0v248"/>
          <path d="M1170 500V254a30 30 0 0 1 60 0v246"/>
        </g>
      </svg>
    </div>
    <div class="wrap cta-band__inner">
      <div>
        <p class="eyebrow" data-reveal style="color:#F6D3DC">${b.short} · first session free</p>
        <h2 class="cta-band__title" data-reveal data-reveal-delay="1">Walk in once.<br>Decide after.</h2>
        <div class="cta-band__actions" data-reveal data-reveal-delay="2">
          <button class="btn btn--light js-enquire" type="button">Quick enquiry ${ico.arrow}</button>
          <a class="btn btn--outline-light" href="${waUrl}" target="_blank" rel="noopener">WhatsApp us</a>
        </div>
      </div>
      <div class="cta-band__aside" data-reveal data-reveal-delay="3">
        <div class="cta-band__line">
          ${ico.pin}
          <div><strong>Address</strong><span>${b.addressShort}</span></div>
        </div>
        <div class="cta-band__line">
          ${ico.clock}
          <div><strong>Timings</strong><span>Monday – Saturday, ${fmt12(b.open)} – ${fmt12(b.close)}<br>Sunday closed</span></div>
        </div>
        <div class="cta-band__line">
          ${ico.phone}
          <div><strong>Branch line</strong><span><a href="tel:${b.phoneRaw}">${b.phoneDisplay}</a></span></div>
        </div>
      </div>
    </div>
  </section>

</main>
${footer(b)}
${enquiryModal()}
${openingScene()}
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}

for (const b of branches) {
  writeFileSync(`${b.slug}.html`, page(b), 'utf8');
  console.log(`wrote ${b.slug}.html`);
}

/* ---------- sitemap ---------- */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[
  { loc: `${BASE}/`, priority: '1.0', freq: 'monthly', image: `${BASE}/assets/img/og.png`, imageTitle: 'Platinum Fitness Club Women Exclusive', imageCaption: 'Women-only gyms in Hyderabad' },
  ...branches.map((b) => ({ loc: `${BASE}/${b.slug}.html`, priority: '0.9', freq: 'monthly', image: `${BASE}/${b.img.hero}`, imageTitle: `Women's gym in ${b.short}`, imageCaption: `Women training at the ${b.short} branch` }))
]
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
    <image:image>
      <image:loc>${u.image}</image:loc>
      <image:title>${u.imageTitle}</image:title>
      <image:caption>${u.imageCaption}</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync('sitemap.xml', sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;
writeFileSync('robots.txt', robots, 'utf8');

console.log('wrote sitemap.xml and robots.txt');
