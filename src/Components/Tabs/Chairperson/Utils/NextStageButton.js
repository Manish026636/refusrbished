
export default function NextStageButton({ btnLabel, handleNextStage, customClass }) {
    return (
        <div
            className="chat-support"

        >
            <button className={`fixed bottom-5 right-5 bg-indigo-700 hover:bg-indigo-800 transition-all active:bg-indigo-800 ${customClass ? customClass : "text-white m-2 p-3"}  rounded-lg`} onClick={handleNextStage}>
                {btnLabel}
            </button>
        </div>
    );
}