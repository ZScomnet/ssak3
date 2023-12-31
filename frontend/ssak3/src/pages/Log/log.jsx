import React,{ useEffect } from "react";
import "./style.css";
import { defaultInstance as api } from '../../util/token';
const Log = () => {
    useEffect(()=>{
        getLog();
    },[]);
    let log = [];
    let loading = false;
    const getLog = () => {
        api.get("/robot/log?id="+localStorage.getItem("userId"))
        .then((res)=>{
            log = res.data;
            loading = true;
        }).catch((err)=>{
            window.alert("로그를 불러오는 중 문제가 발생했습니다.");
        })
    };
    
    return (<div>
                {
                    loading ?
                    <div className="logContainer">
                        <div className="axiosLoadingGif"/>
                    </div>
                    :    
                    <div className="logContainer">
                        <div className="logCount">빨래 기록 ({log.length})</div>
                        <div className="timeSort">Ⅴ 시간순</div>
                        {/* <div className="timeSort">
                            <select value={selectedTime} onChange={handleSelectChange}>
                                <option value="">시간을 선택하세요</option>
                                {times.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                                ))}
                            </select>
                        </div> */}
                        {log.map((item, index) => (
                            <div className="logBox">
                                <div className="logTitle">
                                    {item.start_time}_TASK {item.get_id}
                                </div>
                                <div className="logScore">총 수거량 : {item.laundry_cnt}</div>
                                <div className="logTime">{item.start_time} ~ {item.end_time}</div>
                            </div>
                        
                        ))}
                        {/* <div className="logBox">
                            <div className="proceedingTitle">YYYY-MM-DD_TASK0</div>
                            <div className="proceedingPredict">예상 시간 : 00분</div>
                            <div className="loadingGif"></div>
                            <div className="proceedingStartTime">시작 시간 HH:MM</div>
                            <div className="proceedingScore">현재까지 수거량 : 00</div>
                        </div>
                        <div className="logBox">
                            <div className="logTitle">YYYY-MM-DD_TASK0</div>
                            <div className="logScore">총 수거량 : 00</div>
                            <div className="logTime">HH:MM ~ HH:MM</div>
                            
                        </div> */}
                    </div>
                }
        </div>
    );
}
export default Log;