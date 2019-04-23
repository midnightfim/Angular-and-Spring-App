package midnightfim.backend.represitory;

import midnightfim.backend.data.Todo;
import org.springframework.data.repository.CrudRepository;

// репозиторий, обеспечивающий работу с MySql базой данных

public interface todoRepository extends CrudRepository<Todo, Integer> {
}
