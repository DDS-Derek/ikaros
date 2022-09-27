package cn.liguohao.ikaros.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * Setting entity.
 *
 * @author johnniang
 * @author ryanwang
 * @date 2019-03-20
 */
@Entity
@Table(name = "options")
public class OptionEntity extends BaseEntity {

    public enum Type {
        INTERNAL,

        CUSTOM;
    }

    private Type type = Type.INTERNAL;

    @Column(name = "ikkey", nullable = false)
    private String key = "";

    /**
     * option value
     */
    @Column(name = "ikvalue", nullable = false)
    @Lob
    private String value  = "";

    public OptionEntity() {
    }

    public OptionEntity(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public OptionEntity(Type type, String key, String value) {
        this.type = type;
        this.key = key;
        this.value = value;
    }

    public Type getType() {
        return type;
    }

    public OptionEntity setType(Type type) {
        this.type = type;
        return this;
    }

    public String getKey() {
        return key;
    }

    public OptionEntity setKey(String key) {
        this.key = key;
        return this;
    }

    public String getValue() {
        return value;
    }

    public OptionEntity setValue(String value) {
        this.value = value;
        return this;
    }
}