import EventBus from "../../util/EventBus";
import SiteCount from "../../site/SiteCount";
import Address from "../../site/Address";
import $ from "jquery";

/**
 *
 * @constructor
 */
class TotalCountPanel {

    constructor() {
        this.table = $("#total-count-table");
        this.countMapCountry = SiteCount.getCountMapByCountry();
        this.countMapRegion = SiteCount.getCountMapByRegion();
        this.updateView(0, this.countMapCountry[Address.COUNTRY_WORLD]);
        EventBus.addListener("map-viewport-change-event", this.mapViewPortChanged, this);

        // These (private constants) must be in the constructor because they use
        // a reference to google.* which may not be defined when code outside the
        // class methods is initialized.
        TotalCountPanel.USA = new google.maps.LatLngBounds(new google.maps.LatLng(24.44715, -125.15625), new google.maps.LatLng(49.0, -65.961914));
        TotalCountPanel.CANADA = new google.maps.LatLngBounds(new google.maps.LatLng(49.0, -140.976562), new google.maps.LatLng(70.318738, -57.744141));
        TotalCountPanel.EUROPE = new google.maps.LatLngBounds(new google.maps.LatLng(35.38905, -14.501953), new google.maps.LatLng(70.902268, 37.265625));
        TotalCountPanel.ASIA = new google.maps.LatLngBounds(new google.maps.LatLng(-43.580391, 50.097656), new google.maps.LatLng(70.728979, 175.429688));
        TotalCountPanel.AUSTRALIA = new google.maps.LatLngBounds(new google.maps.LatLng(-40.111689, 109.951172), new google.maps.LatLng(-11.092166, 156.796875));
        TotalCountPanel.CHINA = new google.maps.LatLngBounds(new google.maps.LatLng(21.616579, 100.371094), new google.maps.LatLng(42.130821, 124.233398));
        TotalCountPanel.JAPAN = new google.maps.LatLngBounds(new google.maps.LatLng(30.600094, 129.089355), new google.maps.LatLng(42.130821, 147.436523));
    }

    mapViewPortChanged(event, latLngBounds) {
        const center = latLngBounds.getCenter();

        if (TotalCountPanel.USA.contains(center)) {
            this.updateView(1, this.countMapCountry[Address.COUNTRY_USA]);
        } else if (TotalCountPanel.CANADA.contains(center)) {
            this.updateView(1, this.countMapCountry[Address.COUNTRY_CANADA]);
        } else if (TotalCountPanel.EUROPE.contains(center)) {
            this.updateView(1, this.countMapRegion[Address.REGION_EUROPE]);
        }
        /* China is inside of Asia */
        else if (TotalCountPanel.CHINA.contains(center)) {
            this.updateView(1, this.countMapCountry[Address.COUNTRY_CHINA]);
        }
        /* Japan is inside of Asia */
        else if (TotalCountPanel.JAPAN.contains(center)) {
            this.updateView(1, this.countMapCountry[Address.COUNTRY_JAPAN]);
        }
        /* Australia is inside of Asia */
        else if (TotalCountPanel.AUSTRALIA.contains(center)) {
            this.updateView(1, this.countMapCountry[Address.COUNTRY_AUSTRAILIA]);
        }
        else if (TotalCountPanel.ASIA.contains(center)) {
            this.updateView(1, this.countMapRegion[Address.REGION_ASIA_PACIFIC]);
        }

    };

    updateView(row, countMap) {
        const row1 = this.table.find("tr").eq(row);
        const nonControlCells = row1.find("td[rowspan!=2]");
        nonControlCells.eq(0).text(countMap.open);
        nonControlCells.eq(1).text(countMap.construction);
        nonControlCells.eq(2).text(countMap.permit);
        nonControlCells.eq(3).text(countMap.key);
    };

}


export default TotalCountPanel;

