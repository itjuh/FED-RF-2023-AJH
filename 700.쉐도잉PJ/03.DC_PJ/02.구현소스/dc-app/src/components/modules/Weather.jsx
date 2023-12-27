import { Component } from "react";
import "../../css/weather.css";
import axios from "axios";
// class component
class Weather extends Component {
  // 생성자함수(constructor function)
  constructor(props) {
    // 부모에게 전달
    // 부모클래스는 super키워드로!
    super(props);
    // 생성자 함수 구역에 멤버변수 즉, 클래스 속성을 만들면
    // 이것이 상태변수가 된다!!
    // 클래스 내부 속성은 this키워드를 사용함!
    // 받아온 날씨 정보를 셋업 할 객체임!
    this.state = { temp: "", desc: "", icon: "", loading: true, city: "" };
    // 함수형 컴포넌트처럼 useState()를 사용하지 않음!
    // ->값의 셋팅은 this.setState({})라고 씀
    // (함수형과 같지만 처음 선언 시 없음)
  }
  /**
   * 컴포넌트 생성 후 날씨정보 조회하여 화면에 보이기
   * 함수형 컴포넌트에서는 랜더링 후는 useEffect()이지만
   * 클래스형은 componentDidMount() 메서드를 사용함!
   */
  componentDidMount() {
    // 날씨정보 조회 사이트
    // https://openweathermap.org/
    // 날씨컨디션 아이콘
    // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    // https://openweathermap.org/img/wn/10d@2x.png

    // 1. 지정도시명
    const cityName = "Seoul";
    // 2. 날씨정보조회 키코드(로그인 사용자 키 복사)
    const apiKey = "488dce4aa5165d6ef1054d32eff2d580";
    // 3. 날씨정보조회 url : 날씨정보 제이슨이 날아온다!!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // fetch()함수를 이용한 데이터 조회하기 /////////////////////
    /**********************************************************
    fetch(url)
      .then((res) => res.json()) // .json() 파일형식 파싱
      .then((weatherData) => {
        // 파일 파싱 후 데이터 받기
        console.log(weatherData.main.temp);
        console.log(weatherData.name);
        console.log(weatherData.weather[0].icon);
        console.log(weatherData.weather[0].description);
        // console.log(weatherData);
        // 상태변수에 담기
        // 셋팅용 상태변수 메서드형은 this.setState({})
        this.setState({
          temp: weatherData.main.temp,
          desc: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          loading: false,
          city: weatherData.name,
        });
      }) //// fetch - then ///
      // error
      .catch((err) => console.log(err));
      ******************************************************/

    // axios 라이브러리를 이용한 데이터 조회하기! //
    /**
     * 설치 : npm i axios
     * axios는 데이터를 프라미스로 처리하여 원하는 결과를 보장하는
     * 간편한 데이터 처리 라이브러리다
     *
     * 사용법 :
     * import axios from 'axios';
     * 파일가져오기 메서드 get()
     * 다음 실행 메서드 then()
     */
    axios
      .get(url) // file loading
      .then((res) => {
        // file auto parsing
        console.log(res);
        /**주의: data속성에 실제 데이터가 담김 : res.data해야 fetch()와 데이터가 동일 */
        const weatherData = res.data;
        this.setState({
          temp: weatherData.main.temp,
          desc: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          loading: false,
          city: weatherData.name,
        });
      }) // then //
      .catch(err=>{
        console.log(err);
      }); // error ////
    /////////////// axios end ///////////
  } // componentDidMount ////
  // 컴포넌트 랜더링 메서드 //// -> 리턴코드구역
  render() {
    // 아이콘 정보
    const isrc = "https://openweathermap.org/img/wn/" + this.state.icon + ".png";
    // 화씨 -> 섭씨 변환
    let cTemp = parseInt(this.state.temp - 273.15).toFixed(1);
    // 로딩값이 true이면
    if (this.state.loading) {
      return <h4>Loading.....</h4>;
    } else {
      return (
        <div className="weather-bx">
          <h4>Now Weather</h4>
          <h4>{this.state.city}</h4>
          <img src={isrc} alt={this.state.description} />
          {/* 화씨온도 섭씨온도 출력//소수점 1자리까지만 */}
          <p>{cTemp} ℃</p>
          <p>{this.state.desc}</p>
        </div>
      );
    }
  }
} /////// Weather component ////////

export default Weather;
