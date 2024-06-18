	let tg = window.Telegram.WebApp;

        tg.expand();

        tg.MainButton.textColor = '#FFFFFF';
        tg.MainButton.color = '#2cab37';

        let item = "";

        let btn1 = document.getElementById("btn1");
        let btn2 = document.getElementById("btn2");
        let btn3 = document.getElementById("btn3");
        let btn4 = document.getElementById("btn4");
        let btn5 = document.getElementById("btn5");
        let btn6 = document.getElementById("btn6");

        function handleButtonClick(btn, itemText, itemValue) {
            btn.addEventListener("click", function(){
                if (tg.MainButton.isVisible) {
                    tg.MainButton.hide();
                } else {
                    tg.MainButton.setText(itemText);
                    item = itemValue;
                    tg.MainButton.show();
                }
            });
        }

        handleButtonClick(btn1, "Вы выбрали товар 1!", "1");
        handleButtonClick(btn2, "Вы выбрали товар 2!", "2");
        handleButtonClick(btn3, "Вы выбрали товар 3!", "3");
        handleButtonClick(btn4, "Вы выбрали товар 4!", "4");
        handleButtonClick(btn5, "Вы выбрали товар 5!", "5");
        handleButtonClick(btn6, "Вы выбрали товар 6!", "6");

        Telegram.WebApp.onEvent("mainButtonClicked", function(){
            fetch('/send_to_telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item: item, user: tg.initDataUnsafe.user })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    tg.sendData("Данные успешно отправлены в Telegram");
                } else {
                    tg.sendData("Ошибка отправки данных в Telegram");
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                tg.sendData("Ошибка отправки данных в Telegram");
            });
        });

        let usercard = document.getElementById("usercard");

        let p = document.createElement("p");

        p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;

        usercard.appendChild(p);
