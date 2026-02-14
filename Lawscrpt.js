const lawData = {
    land: {
        title: "🏠 กฎหมายที่ดินและกรรมสิทธิ์",
        body: "ศึกษาเรื่องที่ดินเชิงลึก:\n1. โฉนดที่ดิน (น.ส. 4): เป็นเอกสารแสดงกรรมสิทธิ์ที่สมบูรณ์ที่สุด ผู้ที่มีชื่อในโฉนดคือเจ้าของที่แท้จริงตามกฎหมาย\n2. การครอบครองปรปักษ์: หากมีคนเข้ามาอยู่โดยสงบ เปิดเผย และมีเจตนาเป็นเจ้าของติดต่อกันเกิน 10 ปี (สำหรับที่โฉนด) เขาอาจร้องขอต่อศาลเพื่อเอากรรมสิทธิ์ได้\n3. การซื้อขาย: ต้องทำเป็นหนังสือและจดทะเบียน ณ สำนักงานที่ดินเท่านั้น",
        ref: "อ้างอิง: ป.พ.พ. มาตรา 1382",
        questions: Array(10).fill({ q: "ครอบครองปรปักษ์ที่ดินโฉนดต้องกี่ปี?", a: ["1 ปี", "5 ปี", "10 ปี", "20 ปี"], c: 2 })
    },
    guarantee: {
        title: "🤝 สัญญาค้ำประกัน",
        body: "คุ้มครองผู้ค้ำประกัน:\n1. ผู้ค้ำไม่ต้องรับผิดอย่างลูกหนี้ร่วมอีกต่อไปตามกฎหมายใหม่\n2. หากลูกหนี้ผิดนัด เจ้าหนี้ต้องแจ้งผู้ค้ำภายใน 60 วัน\n3. สัญญาต้องมีหลักฐานเป็นหนังสือจึงจะฟ้องร้องได้",
        ref: "อ้างอิง: ป.พ.พ. บรรพ 3 (แก้ไขเพิ่มเติมปี 2558)",
        questions: Array(10).fill({ q: "เจ้าหนี้ต้องแจ้งผู้ค้ำภายในกี่วัน?", a: ["30 วัน", "60 วัน", "90 วัน", "7 วัน"], c: 1 })
    },
    inheritance: {
        title: "💰 กฎหมายมรดก",
        body: "ลำดับการสืบมรดก:\n1. ทายาทลำดับ 1 คือผู้สืบสันดาน (บุตร/หลาน)\n2. ทายาทลำดับ 2 คือบิดามารดา\n3. คู่สมรสมีสิทธิรับมรดกเสมือนทายาทลำดับที่ 1\n4. พินัยกรรมสามารถกำหนดผู้รับมรดกแทนทายาทโดยธรรมได้ทั้งหมด",
        ref: "อ้างอิง: ป.พ.พ. มาตรา 1629",
        questions: Array(10).fill({ q: "ทายาทโดยธรรมลำดับที่ 1 คือใคร?", a: ["บุตร", "พ่อแม่", "พี่น้อง", "คู่สมรส"], c: 0 })
    },
    family: {
        title: "💍 กฎหมายครอบครัว",
        body: "ความสัมพันธ์และการจัดการทรัพย์สิน:\n1. สมรสสมบูรณ์เมื่อ 'จดทะเบียน' เท่านั้น\n2. สินสมรสคือทรัพย์สินที่ได้มาระหว่างสมรส แบ่งคนละครึ่งเมื่อหย่า\n3. บิดาจะรับรองบุตรได้ต้องจดทะเบียนรับรองหรือศาลสั่ง",
        ref: "อ้างอิง: ป.พ.พ. บรรพ 5",
        questions: Array(10).fill({ q: "ทรัพย์ที่ได้มาระหว่างสมรสเรียกว่าอะไร?", a: ["สินส่วนตัว", "สินเดิม", "สินสมรส", "สินจ้าง"], c: 2 })
    }
};

let currentKey = ""; let qIdx = 0; let score = 0;

function openLesson(key) {
    currentKey = key;
    document.getElementById('l-title').innerText = lawData[key].title;
    document.getElementById('l-body').innerText = lawData[key].body;
    document.getElementById('l-ref').innerText = lawData[key].ref;
    document.getElementById('lesson-screen').classList.remove('hidden');
} 

function closeAll() {
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
}

function startQuiz() {
    qIdx = 0; score = 0;
    closeAll(); // ปิดหน้าบทเรียนก่อน
    document.getElementById('quiz-screen').classList.remove('hidden'); // เปิดหน้า Quiz
    renderQuestion();
}

function renderQuestion() {
    const q = lawData[currentKey].questions[qIdx];
    document.getElementById('q-status').innerText = `พิจารณาคดีข้อที่ ${qIdx + 1}/10`;
    document.getElementById('q-text').innerText = q.q;
    let html = "";
    q.a.forEach((ans, i) => {
        html += `<button class="opt-btn" onclick="check(${i})">${ans}</button>`;
    });
    document.getElementById('q-options').innerHTML = html;
}

function check(i) {
    if(i === lawData[currentKey].questions[qIdx].c) score++;
    qIdx++;
    if(qIdx < 10) renderQuestion(); else showResult();
}

function showResult() {
    closeAll();
    const res = document.getElementById('result-screen');
    res.classList.remove('hidden');
    if(score >= 7) {
        res.classList.add('bg-win');
        document.getElementById('r-status').innerText = "ชนะคดี! ความยุติธรรมปรากฏ";
    } else {
        res.classList.add('bg-lose');
        document.getElementById('r-status').innerText = "แพ้คดี... กลับไปทบทวนใหม่";
    }
    document.getElementById('r-score').innerText = `คะแนนของคุณคือ ${score}/10`;
} 