import React from "react";

const TestComponent = () =>{
    return (
        <div className="turn">
        <div className="turnNumber">1</div>
        <div className="first t">
          <select>
            <option value="firstOption">1と技A</option>
            <option value="secondOption">2ndOption</option>
            <option value="3rdOption">3rdOption</option>
            <option value="4thOption">4thOption</option>

            <option value="5thOption">5thOption</option>
            <option value="6thOption">6thOption</option>
            <option value="7thOption">7thOption</option>
            <option value="8thOption">8thOption</option>

            <option value="9thOption">9thOption</option>
            <option value="10thOption">10thOption</option>
            <option value="11thOption">11thOption</option>
            <option value="12thOption">12thOption</option>
            
            <option value="13thOption">13thOption</option>
            <option value="14thOption">14thOption</option>
            <option value="15thOption">15thOption</option>
            <option value="16thOption">16thOption</option>
          </select>
        </div>
        <div className="second t">1←技A</div>
        <div className="third t">1←技A</div>
        <div className="forth t">1←技A</div>
      </div>
   
    );
};

export default TestComponent;