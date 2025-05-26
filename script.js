// script.js

const eventData = {};
const holidays = {
    '2025-01-01': '元日', '2025-01-13': '成人の日', '2025-02-11': '建国記念の日',
    '2025-03-20': '春分の日', '2025-04-29': '昭和の日', '2025-05-03': '憲法記念日',
    '2025-05-04': 'みどりの日', '2025-05-05': 'こどもの日', '2025-07-21': '海の日',
    '2025-08-11': '山の日', '2025-09-15': '敬老の日', '2025-09-23': '秋分の日',
    '2025-10-13': 'スポーツの日', '2025-11-03': '文化の日', '2025-11-23': '勤労感謝の日',
    '2025-12-23': '天皇誕生日'
};
const weekdayNames = ['日', '月', '火', '水', '木', '金', '土'];

window.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('month-select');
    const now = new Date();

    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const option = document.createElement('option');
        option.value = `${year}-${String(month).padStart(2, '0')}`;
        option.textContent = `${year}年${month}月`;
        monthSelect.appendChild(option);
    }

    document.getElementById('setup-form').addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('calendar-title').value;
        const ym = monthSelect.value;
        const [year, month] = ym.split('-').map(Number);
        eventData[ym] = {};

        document.getElementById('planner-container').style.display = 'block';
        document.getElementById('planner-title').textContent = `${title} - ${year}年${month}月`;

        const table = document.createElement('table');
        table.className = 'planner-table';
        const tbody = document.createElement('tbody');
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month - 1, day);
            const dayOfWeek = dateObj.getDay();
            const weekday = weekdayNames[dayOfWeek];
            const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const row = document.createElement('tr');
            row.className = 'planner-row';
            if (holidays[isoDate]) row.classList.add('holiday');
            else if (dayOfWeek === 0) row.classList.add('sunday');
            else if (dayOfWeek === 6) row.classList.add('saturday');

            const th = document.createElement('th');
            th.textContent = `${day}日（${weekday}）`;
            if (holidays[isoDate]) {
                const label = document.createElement('div');
                label.className = 'holiday-label input';
                label.textContent = holidays[isoDate];
                th.appendChild(label);
            }

            const td = document.createElement('td');
            const textarea = document.createElement('textarea');
            textarea.setAttribute('data-day', day);
            td.appendChild(textarea);
            row.appendChild(th);
            row.appendChild(td);
            tbody.appendChild(row);
        }

        const wrapper = document.getElementById('planner-table');
        wrapper.innerHTML = '';
        table.appendChild(tbody);
        wrapper.appendChild(table);
    });

    document.getElementById('preview-btn').addEventListener('click', () => {
        const ym = document.getElementById('month-select').value;
        const title = document.getElementById('calendar-title').value;
        const [year, month] = ym.split('-').map(Number);

        const inputs = document.querySelectorAll('[data-day]');
        inputs.forEach(input => {
            const day = input.getAttribute('data-day');
            const text = input.value.trim();
            if (text) eventData[ym][day] = text;
        });

        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();

        const container = document.createElement('div');
        container.style.width = '800px';
        container.style.margin = '0 auto';
        container.style.background = '#fff';
        container.style.padding = '20px';
        container.style.fontFamily = 'sans-serif';
        container.style.fontSize = '14px';

        const titleEl = document.createElement('h2');
        titleEl.textContent = `${title} - ${year}年${month}月`;
        titleEl.style.textAlign = 'center';
        container.appendChild(titleEl);

        const table = document.createElement('table');
        table.className = 'calendar';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        weekdayNames.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            const td = document.createElement('td');
            td.className = 'empty';
            td.innerHTML = '<div>&nbsp;</div>';
            row.appendChild(td);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month - 1, day);
            const dayOfWeek = currentDate.getDay();
            const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }

            const td = document.createElement('td');
            if (holidays[isoDate]) td.className = 'holiday';
            else if (dayOfWeek === 0) td.className = 'sunday';
            else if (dayOfWeek === 6) td.className = 'saturday';

            const label = holidays[isoDate] ? `<div class="holiday-label output">${holidays[isoDate]}</div>` : '';
            const event = eventData[ym][day] ? `<strong class="event-text">${eventData[ym][day]}</strong>` : '';
            td.innerHTML = `<div><strong>${day}</strong>${label}${event}</div>`;
            if (eventData[ym][day]) td.classList.add('has-event');
            row.appendChild(td);
        }

        while (row.children.length < 7) {
            const td = document.createElement('td');
            td.className = 'empty';
            td.innerHTML = '<div>&nbsp;</div>';
            row.appendChild(td);
        }
        tbody.appendChild(row);
        table.appendChild(tbody);
        container.appendChild(table);
        document.body.appendChild(container);

        html2canvas(container, { scale: 1.5 }).then(canvas => {
            document.body.removeChild(container);
            const imgData = canvas.toDataURL('image/png');

            const htmlContent = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>カレンダー画像</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#eee;}img{max-width:100%;height:auto;box-shadow:0 2px 8px rgba(0,0,0,0.1);}</style></head><body><img src="${imgData}" alt="カレンダー画像" /></body></html>`;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);
            const newTab = window.open(blobUrl, '_blank');
            if (newTab) newTab.onload = () => URL.revokeObjectURL(blobUrl);
        });
    });
});
