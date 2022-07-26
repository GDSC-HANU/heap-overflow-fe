<template>
    <div class="problem-detail">
        <Loading v-if="firstLoading" />
        <ProblemNotFound v-if="problemNotFound" />
        <div class="content" v-if="!firstLoading && !problemNotFound">
            <div class="header" v-show="!fullScreen">
                <Header />
            </div>
            <div class="left" v-show="!fullScreen">
                <Left />
            </div>
            <div :class="fullScreen ? 'right right-full-screen' : 'right'">
                <Right
                    :fullScreen="fullScreen"
                    @enterFullScreen="fullScreen = true"
                    @exitFullScreen="fullScreen = false"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from "./Header.vue"
import Left from './Left.vue'
import Right from "./Right.vue"
import ProblemNotFound from "./ProblemNotFound.vue"
import Loading from "../common/Loading.vue"
import { reactive, Ref, ref } from "@vue/reactivity"
import { getProblemById } from "../../model/domainLogic/problem"
import errorHandler from "@/shared/helpers/errorHandler"
import { AxiosError } from "axios";
import { useRoute, useRouter } from "vue-router"
import { onMounted } from "vue";
import { useStore } from "vuex"
import Problem from "@/problem/model/problem"
import ProgrammingLanguage from "@/problem/model/programmingLanguage"

const route = useRoute()
const store = useStore()
const current = typeof route.params.id === 'string' ? route.params.id : ''

const firstLoading = ref(true)
const problemNotFound = ref(false)
const fullScreen = ref(false)
const problem = ref() as Ref<Problem>

onMounted(async () => {
    try {
        await initProblem()
        restoreCode()
        editorSettings()
        firstLoading.value = false
    } catch (error) {
        const err = error as AxiosError
        errorHandler(err)
        problemNotFound.value = true
        firstLoading.value = false
    }
})

async function initProblem() {
    problem.value = await getProblemById(current)
    store.dispatch("problemStore/setProblem", await getProblemById(current))
}

function restoreCode() {
    const currentCode = localStorage.getItem("problemID: " + store.state.problemStore.problem.getId())
    if (currentCode !== null)
        store.dispatch("problemStore/setCurrentProblemCode", {
            id: store.state.problemStore.problem.getId(),
            code: JSON.parse(currentCode)["code"],
        });
    else
        store.dispatch("problemStore/setCurrentProblemCode", {
            id: store.state.problemStore.problem.getId(),
            code: "",
        });
}

function editorSettings() {
    const defaultSettings = {
        fontSize: "15px",
        fontFamily: "monospace",
        fontWeight: "normal",
        lineHeight: 20,
        wordWrap: false,
        lineNumbers: true,
        scrollBeyondLastLine: true,
        folding: true,
        foldingHighlight: true,
        tabCompletion: "on",
        automaticLayout: true,
        cursorBlinking: "phase",
        language: problem.value.getAllowedProgrammingLanguages()[0],
    };
    const currentSetting = localStorage.getItem("editorSettings")

    if (currentSetting !== null) {
        let currentSettings = JSON.parse(currentSetting)
        store.dispatch("problemStore/setEditorSettings", currentSettings);
    } else {
        store.dispatch("problemStore/setEditorSettings", defaultSettings);
    }
}

</script>
<style lang="scss" scoped>
$left-width: 45vw;
$gap: 15px;

.problem-detail {
    @apply fixed w-full h-full top-0 left-0;
    background-image: linear-gradient(25deg, white, white, white, white, #96e7ff, #fcbdf3, #ebb0ff, white, white, white, white);

    .content {
        @apply grid w-full h-full;
        grid-template-areas: "header header""left right";
        grid-template-columns: min-content;
        grid-template-rows: min-content;
        gap: $gap;
        padding: $gap;

        .header {
            grid-area: header;
            @apply relative;
        }

        .left {
            @apply relative resize-x overflow-hidden rounded-xl dark:border-none;
            grid-area: left;
            width: $left-width;
            border: 1px solid #9288c1;
            background-color: white;
        }

        .right {
            grid-area: right;
            border: 1px solid #9288c1;
            @apply relative overflow-hidden rounded-xl dark:border-none;
            background-color: white
        }

        .right-full-screen {
            @apply fixed inset-0 rounded-none;
        }
    }

    --nav-height: 60px;
}
</style>