(function () {
    function showLoading() {
        document.getElementById("spinner").classList.add("show");
    }
    function hideLoading() {
        document.getElementById("spinner").classList.remove("show");
    }

    let dayInput = document.getElementById('day');
    let monthInput = document.getElementById('month');
    let yearInput = document.getElementById('year');

    function selectOnFocus() { this.select(); }

    function validateDay(v, m) {
        if (!v && parseInt(v) > 0)
            return false;
        switch (parseInt(m)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (parseInt(v) <= 31)
                    return true;
                break;
            case 2:
            case 4:
            case 6:
            case 9:
            case 11:
                if (parseInt(v) <= 30)
                    return true;
                break;
            case 2:
                if (parseInt(v) <= 29)
                    return true;
                break;
        }

        return false;
    }
    function validateMonth(v) {
        if (v && (parseInt(v) > 0) && (parseInt(v) <= 12))
            return true;
        return false;
    }
    function validateYear(v) {
        if (v && (parseInt(v) > new Date().getFullYear() - 100 + 543) && (parseInt(v) <= new Date().getFullYear() - 3 + 543))
            return true;
        return false;
    }
    function showResult() {
        document.getElementById("overlay").classList.add("show");
        document.getElementById("modal").classList.add("show");
    }
    function hideResult() {
        document.getElementById("overlay").classList.remove("show");
        document.getElementById("modal").classList.remove("show");
    }

    let range = [
        [new Date(1, 0, 1), new Date(1, 0, 20), 0],
        [new Date(1, 0, 20), new Date(1, 1, 19), 1],
        [new Date(1, 1, 19), new Date(1, 2, 21), 2],
        [new Date(1, 2, 21), new Date(1, 3, 20), 3],
        [new Date(1, 3, 20), new Date(1, 4, 21), 0],
        [new Date(1, 4, 21), new Date(1, 5, 22), 1],
        [new Date(1, 5, 22), new Date(1, 6, 23), 2],
        [new Date(1, 6, 23), new Date(1, 7, 21), 3],
        [new Date(1, 7, 21), new Date(1, 8, 23), 0],
        [new Date(1, 8, 23), new Date(1, 9, 24), 1],
        [new Date(1, 9, 24), new Date(1, 10, 22), 2],
        [new Date(1, 10, 22), new Date(1, 11, 22), 3],
        [new Date(1, 11, 22), new Date(1, 11, 31), 0],
    ]
    let dict = [
        ['7aKZzoKTNUiMEOwQDtcpag'],
        ['z7nHr8dZ5US65Ubm6z48MQ'],
        ['YWWLAGPfbEOXu705hoBwxQ'],
        ['hk9xjQHyOECCUqjaBvC2oQ'],
    ]
    function calculateResult(year, month, day) {
        let dob = new Date(1, month - 1, day);
        for (let i = 0; i < range.length; i++)
            if (dob >= range[i][0] && dob < range[i][1])
                return dict[range[i][2]][Math.floor(Math.random()*dict[range[i][2]].length)];
    }
    function checkCompleted() {
        if (validateYear(yearInput.value) && validateMonth(monthInput.value) && validateDay(dayInput.value, monthInput.value)) {
            showLoading();
            setTimeout(function () {

                var result = calculateResult(parseInt(yearInput.value), parseInt(monthInput.value), parseInt(dayInput.value))

                let _img = document.getElementById('result');
                let newImg = new Image;
                newImg.onload = function () {
                    dayInput.value = '';
                    monthInput.value = '';
                    yearInput.value = '';
                    _img.src = this.src;
                    showResult();
                    hideLoading();
                }

                newImg.src = `result/${result}.png`;
            }, 200);
            return true;
        }
        return false;
    }
    function checkNumber(min, max) {
        this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');
    }
    function onDay(e) {
        checkCompleted();
        let dayLenght = this.value.length;
        var day = parseInt(this.value);
        switch (dayLenght) {
            case 1:
                if (day > 3) {
                    dayInput.value = '0' + day;
                    monthInput.focus();
                }
                break;
            case 2:
                if (day > 0 && day <= 31)
                    monthInput.focus();
                else dayInput.value = dayInput.value[0];
                break;
        }
    }
    function onMonth(e) {
        if (!this.value && e.code == 'Backspace')
            dayInput.focus();
        let monthLength = this.value.length;
        var month = parseInt(this.value);
        switch (monthLength) {
            case 1:
                if (month > 1) {
                    monthInput.value = '0' + month;
                    yearInput.focus();
                }
                break;
            case 2:
                if (month > 0 && month <= 12)
                    yearInput.focus();
                else monthInput.value = monthInput.value[0];
                break;
        }
    }
    function onYear(e) {
        if (!this.value && e.code == 'Backspace')
            monthInput.focus();
        let yearLength = this.value.length;
        var year = parseInt(this.value);
        if (yearLength == 4) {
            if (!checkCompleted())
                this.select()
        }
    }
    dayInput.onfocus = monthInput.onfocus = yearInput.onfocus = selectOnFocus;

    dayInput.oninput = checkNumber;
    monthInput.oninput = checkNumber;
    yearInput.oninput = checkNumber;

    dayInput.onkeyup = onDay;
    monthInput.onkeyup = onMonth;
    yearInput.onkeyup = onYear;

    document.getElementById('overlay').onclick = hideResult;
    // document.getElementById('modal').onclick = hideResult;
})()


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }