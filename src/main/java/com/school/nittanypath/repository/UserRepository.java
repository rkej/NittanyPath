package com.school.nittanypath.repository;
import com.school.nittanypath.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@EnableJpaRepositories(basePackages = "com.school.nittanypath.repository")
@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserDto, Integer> {
    @Query(value = "select * FROM canvaspath.user_dto where email = :email", nativeQuery = true)
    List<UserDto> findByEmail(@Param("email") String email);

}
