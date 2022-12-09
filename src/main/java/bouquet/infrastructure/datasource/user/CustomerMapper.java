package bouquet.infrastructure.datasource.user;

import bouquet.domain.model.user.Customer;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomerMapper {
    Customer selectByPrimaryKey(Integer customerId);

    List<Customer> selectAll();

    void insert(Customer customer);

    void update(Customer customer);

    void deleteByPrimaryKey(Integer customerId);

    void deleteAll();
}
