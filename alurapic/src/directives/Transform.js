import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) {

        console.log('diretiva associada');
        console.log(el);
        
        let current = 0;

        el.addEventListener('dblclick', function() {

            // Passando dois param v-meu-transform="{incremento: 15, animate: false}"
            // Executamos o codigo da seguinte forma:

            // let incremento = 90;
            // let animate = false;

            // if(binding.value) {
            //     incremento = binding.value.incremento;
            //     animate = binding.value.animate;
            // }

            // ---------------------------------------------------

            // Passando 1 param e modificadores v-meu-transform.animate.reverse="15"
            // Executamos o codigo da seguinte forma:
            
            // let incremento = binding.value || 90;

            // if(binding.modifiers.reverse) {
            //     current-=incremento;
            // } else {
            //     current+=incremento;
            // }

            // el.style.transform = `rotate(${current}deg)`;

            // if(binding.modifiers.animate) el.style.transition = 'transform 0.5s';

            // ---------------------------------------------------

            // Passando 1 param e argumentos e modificadores v-meu-transform:rotate.animate.reverse="15"
            // Executamos o codigo da seguinte forma:
            
            let incremento = binding.value || 90;
            let efeito;

            if(!binding.arg || binding.arg == 'rotate') {
                
                if(binding.modifiers.reverse) {
                    current-=incremento;
                } else {
                    current+=incremento;
                }

                efeito = `rotate(${current}deg)`;

            } else if(binding.arg == 'scale') {

                efeito = `scale(${incremento})`;
            }

            el.style.transform = efeito;

            if(binding.modifiers.animate) el.style.transition = 'transform 0.5s';
        });
    }

});