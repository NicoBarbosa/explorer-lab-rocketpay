import "./css/index.css"
import IMask from "imask"

const ccBgLight01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) ellipse"
)
const ccBgLight02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) ellipse"
)
const ccBgLight03 = document.querySelector(
  ".cc-bg svg > g g:nth-child(3) ellipse"
)
const ccBgLight04 = document.querySelector(
  ".cc-bg svg > g g:nth-child(4) path"
)
const ccBgLight05 = document.querySelector(".cc-bg svg > g g:nth-child(5) path")

const ccLogoCard = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
  const colors = {
    visa: ["#ADFFF5", "#6C2DD2", "#4012C2", "#39DBFF", "#290BDF"],
    mastercard: ["#FF3939", "#DF0B18", "#C2BB12", "#F4FFAD", "#D22D2D"],
    american: ["#12A3C2", "#ADB0FF", "#39B8FF", "#2DBED2", "#290BDF"],
    discover: ["#FF7539", "#DF3E0B", "#FFEDAD", "#FF7539", "#DF3E0B"],
    maestro: ["#2D5BD2", "#DF0B0B", "#1612C2", "#FFADAD", "#FF3939"],
    diners: ["#0BD2DF", "#12C283", "#39C4FF", "#ADB5FF", "#2DD28D"],
    default: ["#272A40", "#425862", "#8E02A5", "#363B3C", "#606865"],
  }

  ccBgLight01.setAttribute("fill", colors[type][0])
  ccBgLight02.setAttribute("fill", colors[type][1])
  ccBgLight03.setAttribute("fill", colors[type][2])
  ccBgLight04.setAttribute("fill", colors[type][3])
  ccBgLight05.setAttribute("fill", colors[type][4])
  ccLogoCard.setAttribute("src", `cc-${type}.svg`)

}


globalThis.setCardType = setCardType


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "american",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find((item) =>
      number.match(item.regex)
    )

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)



const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)



const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '0000'
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)



const addButton = document.querySelector("#add-button")
addButton.addEventListener('click', () => {
  console.log('Opa, bão?')
  alert('Cartão Adicionado!')
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
})



const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')

  ccHolder.innerText = cardHolder.value.length === 0 
                        ? "FULANO DA SILVA" 
                        : cardHolder.value
})



securityCodeMasked.on('accept', () => {
  updatedSecurityCode(securityCodeMasked.value)
})

function updatedSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '123' : code
}



cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updatedCardNumber(cardNumberMasked.value)
})

function updatedCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}



expirationDateMasked.on('accept', () => {
  updatedExpirationDate(expirationDateMasked.value)
})

function updatedExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerText = date.length === 0 ? "01/32" : date
}