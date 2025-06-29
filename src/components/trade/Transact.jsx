import React, { useState } from 'react'

const Transact = () => {
    const [action, setAction] = useState(null);

    return (
        <>
            <fieldset className="fieldset ">
                <legend className="fieldset-legend pt-0">Wallet:</legend>
                <select defaultValue="Pick a wallet" className="select w-full">
                    <option disabled={true}>Pick a wallet</option>
                    <option>Wallet1</option>
                    <option>Wallet2</option>
                    <option>Wallet3</option>
                </select>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend pt-0">Action:</legend>
                <div className="flex gap-2 ">
                    <button
                        type="button"
                        className={`btn flex-1 ${action === 'buy' ? 'btn-success' : 'btn-outline'}`}
                        onClick={() => setAction('buy')}
                    >
                        Buy
                    </button>
                    <button
                        type="button"
                        className={`btn flex-1 ${action === 'sell' ? 'btn-error' : 'btn-outline'}`}
                        onClick={() => setAction('sell')}
                    >
                        Sell
                    </button>
                </div>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend pt-0">Amount (ETK)</legend>
                <input type="text" className="input w-full" placeholder="Enter Amount" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend pt-0">Price (IDRS/ETK)</legend>
                <input type="text" className="input w-full" placeholder="Enter Price" />
            </fieldset>
        </>
    )
}

export default Transact