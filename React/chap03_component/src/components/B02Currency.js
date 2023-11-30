// B01Currency.js
import React, { useCallback, useEffect, useRef, useState } from 'react'

const countries = ['USD', 'EUR', 'KRW'];
const rate = { USD: 1, EUR: 1.25, KRW: 0.00078 };

function B02Currency() {

  const [data, setData] = useState({
    qty: 3,
    cost: 5,
    inCurr: 'USD'
  });
  const qtyRef = useRef(null);

  useEffect(() => {
    qtyRef.current.focus();
  }, []);

  const changeNumber = useCallback((evt) => {
    setData((prevData) => {
      return { ...prevData, [evt.target.name]: evt.target.value }
    })
  }, []);
  const changeCurrency = useCallback((evt) => {
    setData((prevData) => ({ ...prevData, inCurr: evt.target.value }));
  }, []);

  const getTotal = () => {
    const total = countries.map((item) => {
      const price = (data.qty * data.cost * rate[data.inCurr] / rate[item]).toFixed(2);
      return <span key={item}>{item}: {price} {' '}</span>
    })
    return total;
  }


  return (
    <div className='mb-5'>
      <h3>B02Currency</h3>

      <form>
        <div className="form-group mb-3">
          <label htmlFor="qty" className="form-label">QTY</label>
          <input type="text" id="qty" name="qty" className="form-control" ref={qtyRef}
            value={data.qty} onChange={changeNumber} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cost" className="form-label">COST</label>
          <input type="text" id="cost" name="cost" className="form-control"
            value={data.cost} onChange={changeNumber} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="inCurr" className="form-label">기준통화</label>
          <select id="inCurr" className="form-control" onChange={changeCurrency}>
            <option>선택해주세요</option>
            {countries.map((item) => {
              return <option key={item}>{item}</option>
            })}
          </select>
        </div>
      </form>

      <div>Total: {data.qty * data.cost} <span id="abc"></span></div>
      <div>Total: {getTotal()}</div>
    </div>
  )
}

export default B02Currency
