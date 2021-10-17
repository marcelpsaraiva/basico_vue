<template>
  <div>
    <img src="/static/bola.jpg" />
    <h1 class="centralizado">{{ titulo }}</h1> <!-- <h1 v-text="titulo"></h1> -->

    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtrar">
    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">

        <meu-painel :titulo="foto.titulo">
          <!-- v-meu-transform="{incremento: 15, animate: false}" -->
          <imagem-responsiva v-meu-transform:rotate.animate="15" :url="foto.url" :titulo="foto.titulo" />
          <router-link :to="{ name : 'altera', params: { id: foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>
          <meu-botao 
            tipo="button" 
            rotulo="REMOVER" 
            @botaoAtivado="remove(foto)" 
            :confirmacao="true"
            estilo="perigo"/>
        </meu-painel>

      </li>
    </ul>
    
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

  components: {
    'meu-painel' : Painel,
    'imagem-responsiva' : ImagemResponsiva,
    'meu-botao' : Botao
  },

  data() {

    return {
      titulo: 'Álbum de fotos',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  computed: {

    fotosComFiltro() {

      if(this.filtro) {
        /* filtrar as fotos */
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        /* todas as fotos */
        return this.fotos;
      }
    }
  },

  methods: {

    remove(foto) {
        // OPÇÃO 3
        this.service.apaga(foto._id)
          .then(() => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso!';
          },
          err => this.mensagem = err.message
        );
        
        // OPÇÃO 2
        // this.resource
        //   .delete({ id: foto._id })
        //   .then(() => {
        //     let indice = this.fotos.indexOf(foto);
        //     this.fotos.splice(indice, 1);
        //     this.mensagem = 'Foto removida com sucesso!';
        //   },
        //   err => {
        //     console.log(err);
        //     this.mensagem = 'Não foi possível remover a foto.';
        //   });

        // OPÇÃO 1
        // this.$http
        //   .delete(`v1/fotos/${foto._id}`)
        //   .then(() => {
        //     let indice = this.fotos.indexOf(foto);
        //     this.fotos.splice(indice, 1);
        //     this.mensagem = 'Foto removida com sucesso!';
        //   },
        //   err => {
        //     console.log(err);
        //     this.mensagem = 'Não foi possível remover a foto.';
        //   });
    }
  },

  created() {
    // OPÇÃO 3
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);

    // OPÇÃO 2
    // this.resource = this.$resource('v1/fotos{/id}');

    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(photos => this.fotos = photos, err => console.log(err));


    // OPÇÃO 1
    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(photos => this.fotos = photos, err => console.log(err));
  }
}
</script>

<style scoped>
  .centralizado {
    text-align: center;
  }
  .lista-fotos {
    list-style: none;
  }
  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  .filtro {
    display: block;
    width: 100%;
  }
</style>
