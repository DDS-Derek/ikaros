package cn.liguohao.ikaros.common.constants;

/**
 * @author guohao
 * @date 2022/10/02
 */
public interface RegexConstants {
    String EMAIL = "^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?"
        + "[a-zA-Z0-9]+)+[\\\\.][A-Za-z]{2,3}([\\\\.][A-Za-z]{2})?$";

    String TELEPHONE = "0\\\\d{2,3}-\\\\d{7,8}";

    String MOBILE_PHONE_NUMBER = "^((13[0-9])|(15[^4,\\\\D])|(18[0,5-9]))\\\\d{8}$";

}