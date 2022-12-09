package bouquet.infrastructure.datasource.autogen.inventories;

import bouquet.domain.model.autogen.inventories.Arrival;
import org.apache.ibatis.annotations.*;

public interface ArrivalMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    @Delete({
            "delete from inventories.arrival",
            "where arrival_number = #{arrivalNumber,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer arrivalNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    @Insert({
            "insert into inventories.arrival (arrival_number, arrival_date, ",
            "created_by, created_at)",
            "values (#{arrivalNumber,jdbcType=INTEGER}, #{arrivalDate,jdbcType=DATE}, ",
            "#{createdBy,jdbcType=VARCHAR}, #{createdAt,jdbcType=TIMESTAMP})"
    })
    int insert(Arrival record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    int insertSelective(Arrival record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "arrival_number, arrival_date, created_by, created_at",
            "from inventories.arrival",
            "where arrival_number = #{arrivalNumber,jdbcType=INTEGER}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.inventories.ArrivalMapper.BaseResultMap")
    Arrival selectByPrimaryKey(Integer arrivalNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Arrival record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.arrival
     *
     * @mbg.generated
     */
    @Update({
            "update inventories.arrival",
            "set arrival_date = #{arrivalDate,jdbcType=DATE},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP}",
            "where arrival_number = #{arrivalNumber,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Arrival record);
}