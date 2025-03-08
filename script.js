// 定义常量
const INJECTION_INTERVAL_DAYS = 21; // 打针的间隔天数21天
const ONLINE_APPLICATION_REMINDER_DAYS = 14; // 线上申请的提前提醒天数：打针前14天
const CHECK_INTERVAL_DAYS = 42; // 检查的间隔天数42天
const END_DATE = '2026-10-01'; // 打足两年 到2026年10月1日截止

function setReminders() {
    // 获取用户输入的日期
    const inputDate = document.getElementById('inputDate').value;
    if (!inputDate) {
        alert('请输入日期');
        return;
    }

    const knownDates = [
        '2024-09-13',
        '2024-10-04',
        '2024-10-29',
        '2024-12-03',
        '2024-12-24',
        '2025-01-14',
        '2025-02-13',
        '2025-03-06'
    ];

    // 找到下一个打针日期
    let nextDate;
    const inputDateObj = new Date(inputDate);
    const endDateObj = new Date(END_DATE);

    if (inputDateObj >= endDateObj) {
        nextDate = '已达到截止日期，无需再打针';
    } else {
        const nextDateIndex = knownDates.findIndex(date => new Date(date) > inputDateObj);
        if (nextDateIndex !== -1) {
            nextDate = knownDates[nextDateIndex];
        } else {
            // 计算下一个打针日期
            const lastKnownDateObj = new Date(knownDates[knownDates.length - 1]);
            let nextInjectionDateObj = new Date(lastKnownDateObj);
            while (nextInjectionDateObj <= inputDateObj) {
                nextInjectionDateObj.setDate(nextInjectionDateObj.getDate() + INJECTION_INTERVAL_DAYS);
            }
            if (nextInjectionDateObj > endDateObj) {
                nextDate = '已达到截止日期，无需再打针';
            } else {
                const year = nextInjectionDateObj.getFullYear();
                const month = String(nextInjectionDateObj.getMonth() + 1).padStart(2, '0');
                const day = String(nextInjectionDateObj.getDate()).padStart(2, '0');
                nextDate = `${year}-${month}-${day}`;
            }
        }
    }

    // 显示提醒信息
    const remindersDiv = document.getElementById('reminders');
    remindersDiv.innerHTML = `下次打针日期：${nextDate}`;

    // 线上申请提醒
    if (nextDate !== '已达到截止日期，无需再打针') {
        const nextDateObj = new Date(nextDate);
        const reminderDateObj = new Date(nextDateObj);
        reminderDateObj.setDate(reminderDateObj.getDate() - ONLINE_APPLICATION_REMINDER_DAYS);
        const reminderYear = reminderDateObj.getFullYear();
        const reminderMonth = String(reminderDateObj.getMonth() + 1).padStart(2, '0');
        const reminderDay = String(reminderDateObj.getDate()).padStart(2, '0');
        const reminderDate = `${reminderYear}-${reminderMonth}-${reminderDay}`;
        remindersDiv.innerHTML += `<br>线上申请提醒日期：${reminderDate}`;

        // 弹出提醒
        alert(`下次打针日期是 ${nextDate}，线上申请提醒日期是 ${reminderDate}`);
    }
}