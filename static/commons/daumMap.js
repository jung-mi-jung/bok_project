
var mapaddress
var panvalue
var tiltvalue
var zoomvalue
var mapLatNum;
var mapLngNum;
var markerName;


//daumMapSetting("주소값", 방향, 위아래시선, 확대값, 위도, 경도, 마커명);
function daumMapSetting(a,b,c,d,e,f, g) {
	mapaddress = a;//주소
	panvalue = b;//동서남북 방향 각도
	tiltvalue = c;//시선 각도
	zoomvalue = d;//확대
	mapLatNum = e; //위도
	mapLngNum = f; //경도
	markerName = g; //마커명
	if(markerName == "" || markerName == undefined){
		markerName = "한국은행";
	}

	var mapLat = '37.562506';
	var mapLng = '126.979909';
	var mapContainer = document.getElementById('mapView'), // 지도를 표시할 div 
		mapOption = {
			center: new daum.maps.LatLng(mapLatNum, mapLngNum), // 지도의 중심좌표
			level: zoomvalue // 지도의 확대 레벨
		};  

	// 지도를 생성합니다    
	var map = new daum.maps.Map(mapContainer, mapOption); 

	var imageSrc = '/static/commons/img/kakao_map_point.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(70, 70), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	geocoder.addressSearch(mapaddress, function(result, status) {
		// 정상적으로 검색이 완료됐으면 
		 if (status === daum.maps.services.Status.OK) {
			var coords = new daum.maps.LatLng(result[0].y, result[0].x);
			// 결과값으로 받은 위치를 마커로 표시합니다
			var marker = new daum.maps.Marker({
				map: map,
				position: coords
			});
			// 인포윈도우로 장소에 대한 설명을 표시합니다
			var infowindow = new daum.maps.InfoWindow({
				content: '<div style="width:150px;text-align:center;padding:1px 3px;">'+markerName+'</div>'
			});
			infowindow.open(map, marker);
			// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
			map.setCenter(coords);
		} 
	}); 
	//지도 타입 변경 컨트롤
	var mapTypeControl = new daum.maps.MapTypeControl();

	//지도 상단 우측에 지도 타입 변경 컨트롤 추가
	map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

	//확대 축소 컨트롤 
	var zoomControl = new daum.maps.ZoomControl();

	//지도 우측에 확대 축소 컨트롤 추가.
	map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

	/*//로드뷰를 표시할 div
	var roadviewContainer = document.getElementById('roadView'); 

	// 로드뷰 위치
	var rvPosition = new daum.maps.LatLng(mapLat, mapLng);

	//로드뷰 객체를 생성한다
	var roadview = new daum.maps.Roadview(roadviewContainer, {
		pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
		tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
		zoom: -1 // 로드뷰 줌 초기값
	}); 

	//좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체를 생성한다
	var roadviewClient = new daum.maps.RoadviewClient(); 

	// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다
	roadviewClient.getNearestPanoId(rvPosition, 50, function(panoId) {
		// panoId와 중심좌표를 통해 로드뷰를 실행한다
	    roadview.setPanoId(panoId, rvPosition); 
	});

	// 로드뷰 초기화가 완료되었을 때 로드뷰에 마커나 커스텀오버레이를 표시한다
	daum.maps.event.addListener(roadview, 'init', function() {

		// 마커를 생성하고 로드뷰에 표시한다
		var rMarker = new daum.maps.Marker({
			position: new daum.maps.LatLng(37.56633, 126.97847), // 마커의 좌표
			map: roadview // 마커를 표시할 로드뷰 객체
		});
	});*/
}