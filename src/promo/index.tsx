import {ReactNode, useEffect, useState} from "react";
import './style.css'
import {Modal} from "antd";

export const SplitBillPromo = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            const rect = e.currentTarget?.getBoundingClientRect?.() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            });
        };

        const container = document.getElementById('promo-container');
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const floatingElements = [
        { size: 'w-12 h-12', position: 'top-4 left-4', delay: '0s', opacity: 'bg-white/10' },
        { size: 'w-8 h-8', position: 'top-8 right-8', delay: '2s', opacity: 'bg-white/20' },
        { size: 'w-10 h-10', position: 'bottom-16 left-1/4', delay: '4s', opacity: 'bg-white/15' },
        { size: 'w-6 h-6', position: 'bottom-8 right-1/4', delay: '1s', opacity: 'bg-white/25' }
    ];

    return (
        <div
            id="promo-container"
            className="relative w-full max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden"
            style={{
                minHeight: '600px',
                background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease infinite'
            }}
        >

            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {floatingElements.map((element, index) => (
                    <div
                        key={index}
                        className={`absolute ${element.size} ${element.opacity} rounded-full float-animation ${element.position}`}
                        style={{
                            animationDelay: element.delay,
                            transform: `translate(${(mousePosition.x - 0.5) * (index + 1) * 20}px, ${(mousePosition.y - 0.5) * (index + 1) * 20}px)`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 p-6 md:p-8 text-center h-full flex flex-col justify-between">
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl shadow-2xl mb-4 pulse-glow transform hover:scale-105 transition-all duration-300">
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
                        Split<span className="text-yellow-300">Bill</span>
                    </h1>
                </div>

                {/* Main headline */}
                <div className="mb-6 flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                        Управляй <span className="text-yellow-300">расходами</span><br className="hidden sm:block"/>
                        <span className="sm:hidden"> </span>и <span className="text-pink-300">аналитикой</span> легко!
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-xl mx-auto leading-relaxed mb-6">
                        Разделяй счета с друзьями, отслеживай траты и получай детальную аналитику всех своих расходов
                    </p>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
                        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/30">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-sm md:text-base font-bold text-white mb-1">Умное разделение</h3>
                            <p className="text-white/80 text-xs md:text-sm">Автоматический расчет долгов</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/30">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-sm md:text-base font-bold text-white mb-1">Система друзей</h3>
                            <p className="text-white/80 text-xs md:text-sm">Легкое добавление друзей</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/30 sm:col-span-1 col-span-1">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            </div>
                            <h3 className="text-sm md:text-base font-bold text-white mb-1">Аналитика</h3>
                            <p className="text-white/80 text-xs md:text-sm">Детальная статистика</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <a href="https://spltbill.vercel.app/" target="_blank" rel="noreferrer">
                            <button className="group relative px-6 py-3 bg-white text-gray-900 font-bold text-base md:text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-yellow-100 w-full sm:w-auto">
                                <span className="relative z-10">🚀 Начать бесплатно</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                            </button>
                        </a>
                        <a href="https://spltbill.vercel.app/" target="_blank" rel="noreferrer">
                            <button className="px-6 py-3 border-2 border-white/50 text-white font-semibold text-base md:text-lg rounded-xl backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                                📱 Узнать больше
                            </button>
                        </a>
                    </div>

                    {/* Stats */}
                    {/*<div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-4">*/}
                    {/*    <div className="text-center">*/}
                    {/*        <div className="text-lg md:text-2xl font-bold text-white mb-1">5K+</div>*/}
                    {/*        <div className="text-white/70 text-xs">Пользователей</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="text-center">*/}
                    {/*        <div className="text-lg md:text-2xl font-bold text-white mb-1">50K+</div>*/}
                    {/*        <div className="text-white/70 text-xs">Счетов</div>*/}
                    {/*    </div>*/}
                    {/*    <div className="text-center">*/}
                    {/*        <div className="text-lg md:text-2xl font-bold text-white mb-1">99%</div>*/}
                    {/*        <div className="text-white/70 text-xs">Довольных</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
    );
};

export const SplitBillPromoModal = ({children}: {children: ReactNode}) => {
    const [open, setOpen] = useState(true)

    return (
        <>
            {children}
            <Modal open={open} onCancel={() => setOpen(false)} width={800} footer={null}>
                <SplitBillPromo />
            </Modal>
        </>
    )
}