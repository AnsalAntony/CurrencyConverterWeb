import { useState, useEffect } from "react";
import countryList from "../data/countrylist";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const loadFlag = (currency) => {
    return `https://flagcdn.com/48x36/${countryList[currency].toLowerCase()}.png`;
  };

  const handleExchange = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }
    
    setErrorMessage(""); 
    const url = `https://v6.exchangerate-api.com/v6/920a39cb5f241fa972232dae/latest/${fromCurrency}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      const rate = result.conversion_rates[toCurrency];
      setExchangeRate(`${amount} ${fromCurrency} = ${(amount * rate).toFixed(2)} ${toCurrency}`);
    } catch {
      setExchangeRate("Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>Currency Converter</header>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.formInputs}>
          <p className={styles.formInputLabel}>Enter Amount</p>
          <input
            className={styles.formInput}
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.dropList}>
        <div className={styles.from}>
          <p className={styles.formInputLabel}>From</p>
          <div className={styles.selectBox}>
            <img src={loadFlag(fromCurrency)} alt="from-flag" />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(countryList).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.icon} onClick={handleExchange}>
          <FontAwesomeIcon icon={faExchangeAlt} />
        </div>
        <div className={styles.to}>
          <p className={styles.formInputLabel}>To</p>
          <div className={styles.selectBox}>
            <img src={loadFlag(toCurrency)} alt="to-flag" />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(countryList).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
        <div className={styles.exchangeRate}>{exchangeRate}</div>
        <button className={styles.formButton} onClick={getExchangeRate}>
          Convert
        </button>
      </form>
    </div>
  );
}
