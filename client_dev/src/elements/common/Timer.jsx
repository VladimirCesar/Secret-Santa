
export function Timer() {
    let number = 15;
    const element = (
        <div className='timer'>
            <h3 className="timer-number">{number}</h3>
            <h3 className="timer-text">дней до розыгрыша 🎉</h3>
        </div>
    )

    return element;
}