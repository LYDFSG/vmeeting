import { ApiCall } from '@/config/api'

export const getLshareList = function (opt) {
    let URI = '?showapi_appid=34822' +'&showapi_sign=01c8d5c28b34482fa6efffa8734d3783'
    return ApiCall.get(URI)
}
