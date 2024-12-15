'use client'


export const DayAvailable = () => {

    const week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']



    return (
        <div className=" w-[750px] mx-auto mt-10">
            <h2 className="text-xl font-bold text-center mb-4">Selecciona un día</h2>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, index) => (
                    <button
                        key={index}
                        className="p-2 bg-blue-500 text-white w-[100px]  rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => alert(`Seleccionaste el día ${index % 7 + 1}`)}
                    >
                        {week[index % 7]}
                    </button>
                ))}
            </div>
        </div>
    )
}
