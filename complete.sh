#/usr/bin/env bash
_mohism_completions()
{
  COMPREPLY=($(compgen -W "[31mAction Not Support[39m
[90mpower by [39m[31mM[39m[33mo[39m[32mh[39m[34mi[39m[35ms[39m[31mm[39m[33m-[39m[32mf[39m[34mr[39m[35ma[39m[31mm[39m[33me[39m[32mw[39m[34mo[39m[35mr[39m[31mk[39m
" "${COMP_WORDS[1]}"))
}

complete -F _mohism_completions mohism
