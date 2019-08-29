/**
 * Created by Andste on 2017/8/23.
 */

export default {
    link: (address, has_addr) => address['province'] + address['city'] + address['region'] + address['town'] || '' + (has_addr ? + ' ' + address['addr'] : ''),
    regions: (address) => [address['province'], address['city'], address['region'], address['town']],
    regionIds: (address) => {
        if(!address['province_id']) return null;
        return [address['province_id'], address['city_id'], address['region_id'], address['town_id']]
	}
}