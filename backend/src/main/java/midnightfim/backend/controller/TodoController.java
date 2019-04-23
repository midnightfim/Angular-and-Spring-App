package midnightfim.backend.controller;

import midnightfim.backend.data.Todo;
import midnightfim.backend.represitory.todoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// REST контроллер, обеспечивающий обработку HTTP запросов с JSON на localhost:5001/todo/  и отправку JSON ответов клиенту
// Сервер разворачивать не нужно, в spring встроен контейнер сервлетов tomcat, достаточно запустить приложение из IDE

@RestController
@RequestMapping("todo")
public class TodoController {

    // добавляем репозиторий
    @Autowired
    private final todoRepository todoRepository;

    public TodoController(todoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }


    // обрабатывает GET запрос на localhost:5001/todo/. Возвращает все записи из БД
    @GetMapping
    public Iterable<Todo> list() {
        return todoRepository.findAll();
    }


    // обрабатывает GET запрос на localhost:5001/todo/id. Возвращает запись из БД с ссответствующим id
    @GetMapping("{id}")
    public Todo getOne(@PathVariable("id") Todo todo) {
        return todo;
    }



    // обрабатывает POST запрос на localhost:5001/todo. Создает новую запись в БД. Возвращает эту запись
    @PostMapping
    public Todo create(@RequestBody Map<String, String> messageFromClient) {

        Todo message = parseReq(messageFromClient);

        return todoRepository.save(message);
    }


    // обрабатывает PUT запрос на localhost:5001/todo/id. Изменяет запись в БД по id.
    // Не реализован на клиенте
    @PutMapping("{id}")
    public Todo update(@PathVariable("id") Todo todoFromDb,
                       @RequestBody Todo todo) {
        BeanUtils.copyProperties(todo, todoFromDb, "id");

        return todoRepository.save(todoFromDb);
    }


    // обрабатывает DELETE запрос на localhost:5001/todo/id. Удаляет запись в БД по id.
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") String id) {
        todoRepository.deleteById(Integer.parseInt(id));
    }



    // Вспомогательный метод для обработки данных с клиента
    private Todo parseReq(Map<String, String> req){
        Todo t = new Todo();
        t.setText(req.get("title"));
        t.setCompleted(req.get("completed"));
        return t;
    }
}