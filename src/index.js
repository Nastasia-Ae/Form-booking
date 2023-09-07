import css from "../src/style.css";
import JustValidate from 'just-validate';

(function () {

  const formBooking = document.querySelector('.form-booking');

  const tower = document.querySelector('.js-tower');
  const floor = document.querySelector('.js-floor');
  const room = document.querySelector('.js-room');
  const time = document.querySelector('.js-time');
  const date = document.querySelector('.js-date');
  const comments = document.querySelector('.js-comments');

  const btnClean = document.querySelector('.js-btn-clean');
  const status = document.getElementById("my-form-status");


  let array = [];

  function validationCall(form) {

    const validation = new JustValidate(form, {

      errorFieldCssClass: 'is-invalid',
      errorFieldStyle: {
        border: '1px solid #FF5C00',
      },
      errorLabelCssClass: 'is-label-invalid',
      errorLabelStyle: {
        color: '#FF5C00',
      },
      focusInvalidField: true,
      lockForm: true,
    })

    return validation;

  };

  function formSuccess() {

    let objectArray = {
      tower: tower.value, floor: floor.value, room: room.value, time: time.value,
      date: date.value, comments: comments.value
    };

    array.push(objectArray);

    let json = JSON.stringify(array);

    console.log(json);
  };

  function setInfoForms(form) {

    validationCall(form).addField('.js-tower', [
      {
        rule: 'required',
        errorMessage: 'Выберите башню',
      },
    ])
      .addField('.js-floor', [
        {
          rule: 'required',
          errorMessage: 'Выберите этаж',
        },
      ])
      .addField('.js-time', [
        {
          rule: 'required',
          errorMessage: 'Выберите время',
        },
      ])
      .addField('.js-room', [
        {
          rule: 'required',
          errorMessage: 'Выберите переговорную',
        },

      ])
      .addField('.js-date', [
        {
          rule: 'required',
          errorMessage: 'Выберите дату',
        },

      ])
      .addField('.js-comments', [
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Комментарий должен содержать хотя бы 3 буквы'
        },
        {
          rule: 'required',
          errorMessage: 'Введите комментарий'
        }
      ])
      .onSuccess(() => {

        formSuccess();

        status.classList.remove('display-none');
        status.innerHTML = "Спасибо за бронирование!";
        setTimeout(function () {
          status.innerHTML = "";
          status.classList.add('display-none');
        }, 2000);

      });
  };

  setInfoForms(formBooking);


  btnClean.addEventListener('click', ev => {

    ev.preventDefault();

    tower.value = '';
    floor.value = '';
    room.value = '';
    time.value = '';
    date.value = '';
    comments.value = '';

  });

})()
