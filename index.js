const Express = require('express');
const { Subject } = require('rxjs');
const app = Express();

let Items = [
    {
        id: 1,
        post: "testando api rxl"
    },
    {
        id: 2,
        post: "vendo o subscribe"
    },
    {
        id: 3,
        post: "assistindo dados subscribe"
    }
];
const postDeleteSubject = new Subject();

app.get('/posts', (req, res) => {
    res.json(Items);
});

app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    Items = Items.filter(post => post.id !== postId);
    postDeleteSubject.next(postId);
    res.send('Post deleted successfully');
});

const postDeleteObservable = postDeleteSubject.asObservable();  

postDeleteObservable.subscribe(postId => {
    console.log(`Post ${postId} foi deletado`);
});

app.listen(600, () => {
    console.log("Servidor Rodando Lorrys Code🚀");
});
